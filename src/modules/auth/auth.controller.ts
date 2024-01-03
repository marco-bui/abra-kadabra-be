import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginRequest, RegisterRequest } from './dto/request.dto';
import { LoginResponse, RegisterResponse } from './dto/response.dto';
import { ApiResponse } from '../../common/classes/api-response';
import { LoggerService } from '../../common/services/logger.service';

@Controller('auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly logger: LoggerService,
  ) {}

  @Post('register')
  @ApiOperation({
    summary: 'Create a new account',
    description: 'Create a new account',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse()
  async register(
    @Body() body: RegisterRequest,
  ): Promise<ApiResponse<RegisterResponse>> {
    try {
      const res = await this.authService.register(body);
      return res;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  @Post('login')
  @ApiOperation({
    summary: 'Login',
    description: 'Login',
  })
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOkResponse()
  async login(@Body() body: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    try {
      const res = await this.authService.login(body);
      return res;
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
