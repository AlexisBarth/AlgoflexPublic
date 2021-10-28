import { NotFoundError } from "routing-controllers";
import { Service } from "typedi";
import { getRepository, Repository } from "typeorm";
import { Theme } from "../models/theme.model";

@Service()
export class ThemeService {
  themeRepository: Repository<Theme>;

  constructor() {
    this.themeRepository = getRepository(Theme);
  }

  public find() {
    const themes = this.themeRepository.find();
    return themes;
  }

  public findOne(id: number): Promise<Theme | undefined> {
    return this.themeRepository.findOne(id);
  }

  public async create(theme: Theme): Promise<Theme> {
    const newTheme = await this.themeRepository.save(theme);
    return newTheme;
  }

  public update(id: number, theme: Theme): Promise<Theme> {
    theme.id = id;
    return this.themeRepository.save(theme);
  }

  public async delete(id: number): Promise<void> {
    const theme = await this.themeRepository.findOne(id);
    if (!theme) {
      throw new NotFoundError(`Theme with id '${id}' was not found`);
    }
    await this.themeRepository.delete(id);
    return;
  }
}
