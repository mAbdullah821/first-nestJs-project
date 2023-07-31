import { Test, TestingModule } from '@nestjs/testing';
import { NumberManipulationService } from './number-manipulation.service';

describe('NumberManipulationService', () => {
  let service: NumberManipulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NumberManipulationService],
    }).compile();

    service = module.get<NumberManipulationService>(NumberManipulationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
