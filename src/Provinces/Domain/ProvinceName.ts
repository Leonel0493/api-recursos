import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";

export class ProvinceName {
  constructor(readonly provinceName: string) {
    this.provinceName = this.CleanNaming(provinceName);
    this.ValidateProvinceName(this.provinceName);
  }

  private CleanNaming(provinceName: string): string {
    let cleanName = provinceName.trim().toUpperCase();

    cleanName = cleanName.replace(/\s+/g, " ");

    return cleanName;
  }

  private ValidateProvinceName(provice: string) {
    if (provice.length > 50)
      throw new InvalidArgumentError(
        "Lo sentimos el numero de caracteres es superior al permitido"
      );
  }
}
