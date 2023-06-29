import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { getUser } from 'src/auth/decorator/user.decorator';
import { User } from '@prisma/client';

@UseGuards(JwtGuard)
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  findAll(@getUser('id') userId: User) {
    return this.bookmarkService.findAll(+userId);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.findOne(id);
  }

  @Post()
  create(
    @Body() createBookmarkDto: CreateBookmarkDto,
    @getUser('id') userId: number,
  ) {
    return this.bookmarkService.create(createBookmarkDto, +userId);
  }

  @Patch(':id')
  updateOne(
    @Body() updateBookmarkDto: UpdateBookmarkDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.bookmarkService.updateOne(updateBookmarkDto, id);
  }

  @Delete(':id')
  deleteOne(@Param('id', ParseIntPipe) id: number) {
    return this.bookmarkService.deleteOne(id);
  }
}
