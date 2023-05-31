import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('ninjas')
@UseGuards(BeltGuard)
export class NinjasController {
  constructor(private readonly ninjaService: NinjasService) {}
  //GET /ninjas --> []
  @Get()
  getNinjas(
    @Query('power') power: 'wind' | 'thunder' | 'fire' | 'aqua' | 'earth',
  ) {
    //const service = new NinjasService();
    return this.ninjaService.getNinjas(power);
  }
  //GET /ninjas/:id --> {...}
  @Get(':id')
  //getOneNinja(@Param('id') id: string) OG, when using Pipe
  getOneNinja(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjaService.findNinja(id);
    } catch (err) {
      throw new NotFoundException('Ninja is not found');
    }
  }
  //POST /ninjas
  @Post()
  @UseGuards(BeltGuard)
  createNinjas(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    return this.ninjaService.createNinja(createNinjaDto);
  }
  //PUT /ninjas/:id
  @Put(':id')
  updateNinjas(@Param('id') id: string, @Body() updateNinja: UpdateNinjaDto) {
    return this.ninjaService.updateNinja(+id, updateNinja);
  }

  //DELETE /ninjas/:id
  @Delete(':id')
  deleteNinjas(@Param('id') id: string) {
    return this.ninjaService.deleteNinja(+id);
  }
}
