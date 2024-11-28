import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtAuthService } from './jwt.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private jwtAuthService: JwtAuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      secretOrKey: 'your_secret_key', // Same secret used in JwtModule.register
    });
  }

  async validate(payload: any) {
    // You can add extra logic to validate the user here if needed
    return { userId: payload.sub, email: payload.email }; // Attach user info to the request
  }
}
