import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.schema';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: User): string {
    const payload = { email: user.email, sub: user._id }; // Add any other necessary data to the payload
    return this.jwtService.sign(payload); // Generate JWT token
  }
}
