import { ApiProperty } from '@nestjs/swagger';

export class UserEntity {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    roles: [ { "role": { "value": string }} ]
}