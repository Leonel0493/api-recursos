import { InvalidArgumentError } from "../../Shared/Domain/InvalidArgumentError";

export class DocumentParttern {
  constructor(readonly parttern: string | null) {
    this.parttern = parttern;
    if (parttern !== null) {
      this.ValidatePartternLength(parttern);
      this.ValidatePartternCharacters(parttern);
    }
  }

  private ValidatePartternLength(parttern: string) {
    if (parttern.length > 150)
      throw new InvalidArgumentError(
        "La longitud del patron del documento no debe de exceder los 150 caracteres, por favor intente de nuevo."
      );
  }

  private ValidatePartternCharacters(parttern: string) {
    const _pattern =
      /^([nN]+|[cC]+|[nN]+-[nN]|[cC]+-[nN]|[nN]+-[cC]|[cC]+-[cC]|-)*$/;
    console.log(_pattern.test(parttern));
    if (!_pattern.test(parttern))
      throw new InvalidArgumentError(
        "El patron seleccionado no coincide con los patrones permitidos"
      );
  }
}
