import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthService } from '../auth/jwt.service'; // Import the JwtAuthService
import { User } from './user.schema';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtAuthService: JwtAuthService, // Inject JwtAuthService
  ) {}

  @Post()
  async createUser(@Body() userData: Partial<User>): Promise<User> {
    return this.userService.createUser(userData);
  }

  // Add the login endpoint
  @Post('login')
  async loginUser(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<any> {
    // Validate the user's credentials
    const user = await this.userService.loginUser(email, password);
    
    // Generate and return the JWT token
    const token = this.jwtAuthService.generateToken(user);
    return { access_token: token };
  }
}
