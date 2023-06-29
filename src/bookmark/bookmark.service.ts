import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private readonly prismaService: PrismaService) {}
  findAll(userId: number) {
    return this.prismaService.bookmark.findMany({ where: { userId } });
  }

  async findOne(id: number) {
    const bookmark = await this.prismaService.bookmark.findUnique({
      where: { id: id },
    });
    if (!bookmark)
      throw new NotFoundException(`Bookmark with the id ${id} not found!`);
    return bookmark;
  }

  async create(createBookmarkDto: CreateBookmarkDto, userId: number) {
    const bookmark = await this.prismaService.bookmark.create({
      data: {
        link: createBookmarkDto.link,
        title: createBookmarkDto.title,
        description: createBookmarkDto.description,
        userId,
      },
    });
    return bookmark;
  }

  async updateOne(updateBookmarkDto: UpdateBookmarkDto, id: number) {
    return await this.prismaService.bookmark.update({
      where: { id },
      data: {
        title: updateBookmarkDto.title,
        description: updateBookmarkDto.description,
        link: updateBookmarkDto.link,
      },
    });
  }

  deleteOne(id: number) {
    return this.prismaService.bookmark.delete({ where: { id } });
  }
}
