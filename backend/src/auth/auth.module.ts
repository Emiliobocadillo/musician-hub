import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module'; // Import UserModule
import { JwtAuthService } from './jwt.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'your_secret_key',  // Use an environment variable here
      signOptions: { expiresIn: '1h' },
    }),
    forwardRef(() => UserModule),  // Use forwardRef to handle circular dependency
  ],
  providers: [JwtAuthService, JwtStrategy],
  exports: [JwtAuthService],  // Export JwtAuthService for use in UserModule if needed
})
export class AuthModule {}
