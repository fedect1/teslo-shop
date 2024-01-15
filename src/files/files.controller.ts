import { BadRequestException, Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/fileFilter.helper';
import { diskStorage } from 'multer';
import { fileNamer } from './helpers/fileNamer.helper';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('product/:imageName')
  findProductImg( 
    @Param('imageName') imageName: string,
    @Res() res: Response
    ) {
    const path = this.filesService.getStaticProductImage( imageName )
    res.sendFile( path );
  }

  @Post('product')
  @UseInterceptors( FileInterceptor('file', {
    fileFilter: fileFilter,
    storage: diskStorage({
      destination: './static/products',
      filename: fileNamer
    })
  }) )
  uploadProductImage( 
    @UploadedFile() file: Express.Multer.File ) {
      if ( !file ) { throw new BadRequestException('Make sure that the file is an image')};
      const secureUrl = `${file.filename}`  
      
      return { secureUrl }
    
  }
}
