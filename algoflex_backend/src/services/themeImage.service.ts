import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { ThemeImage } from "../models/themeImage.model";

@Service()
export class ThemeImageService {
  themeImageRepository: Repository<ThemeImage>;

  constructor() {
    this.themeImageRepository = getRepository(ThemeImage);
  }

  public find() {
    const themeImages = this.themeImageRepository.find();
    return themeImages;
  }

  public findOne(id: number): Promise<ThemeImage | undefined> {
    return this.themeImageRepository.findOne(id);
  }

  public async create(themeImage: ThemeImage): Promise<ThemeImage> {
    const newThemeImage = await this.themeImageRepository.save(themeImage);
    return newThemeImage;
  }

  public update(id: number, themeImage: ThemeImage): Promise<ThemeImage> {
    themeImage.id = id;
    return this.themeImageRepository.save(themeImage);
  }

  public async delete(id: number): Promise<void> {
    const themeImage = await this.themeImageRepository.findOne(id);
    if (!themeImage) {
      throw new NotFoundError(`ThemeImage with id '${id}' was not found`);
    }
    await this.themeImageRepository.delete(id);
    return;
  }
}
