import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';
import { LoginRequest, RegisterRequest } from './dto/request.dto';
import { LoginResponse, RegisterResponse } from './dto/response.dto';
import { ApiResponse } from '../../common/classes/api-response';
import { AuthTokenInterface } from '../../common/classes/interface';
import { ErrorCode } from '../../common/constants/error';
import { ApiMessage } from '../../common/constants/message';
import { ApiException } from '../../common/exceptions/api-exception';
import { compare, hash } from '../../common/utils/utils';
import { Config } from '../../config/config';
import { User } from '../database/models/entities';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
    const existed = await this.userRepository.findOne({
      where: [{ username: dto.username }, { email: dto.email }],
    });

    if (existed && existed.email) {
      throw new ApiException(HttpStatus.BAD_REQUEST, ErrorCode.EMAIL_REGISTERED);
    }

    if (existed && existed.username) {
      throw new ApiException(HttpStatus.BAD_REQUEST, ErrorCode.USERNAME_EXISTED);
    }

    const salt = v4();
    const password = await hash(dto.password, salt);

    const user = await this.userRepository.save(
      this.userRepository.create({
        email: dto.email,
        salt,
        password,
        name: dto.name,
        username: dto.username,
      }),
    );

    const auth: AuthTokenInterface = {
      id: user.id,
      role: user.role,
    };

    const token: string = this.jwtService.sign(auth, {
      secret: Config.JWT.JWT_SECRET_KEY,
      expiresIn: Config.JWT.JWT_EXPIRED_TIME,
    });

    return {
      status: HttpStatus.OK,
      data: {
        token,
      },
      pagination: null,
      message: ApiMessage.REGISTER_SUCCESS,
    };
  }

  async login(dto: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    const { email, password } = dto;

    const user = await this.userRepository.findOneBy({ email });
    if (!user) {
      throw new ApiException(HttpStatus.BAD_REQUEST, ErrorCode.USER_NOT_EXISTED);
    }

    const isValidPassword = await compare(password, user.salt, user.password);
    if (!isValidPassword) {
      throw new ApiException(HttpStatus.BAD_REQUEST, ErrorCode.INVALID_PASSWORD);
    }

    const auth: AuthTokenInterface = {
      id: user.id,
      role: user.role,
    };

    const token: string = this.jwtService.sign(auth, {
      secret: Config.JWT.JWT_SECRET_KEY,
      expiresIn: Config.JWT.JWT_EXPIRED_TIME,
    });

    return {
      status: HttpStatus.OK,
      data: {
        token,
      },
      pagination: null,
      message: ApiMessage.LOGIN_SUCCESS,
    };
  }
}
