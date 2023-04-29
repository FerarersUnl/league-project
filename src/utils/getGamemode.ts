export function getGamemode(gamemode: string): string {
  switch (gamemode) {
    case 'CLASSIC':
      return 'Normal';
    case 'ODIN':
      return 'Dominio';
    case 'ARAM':
      return 'ARAM';
    case 'TUTORIAL':
      return 'Tutorial';
    case 'URF':
      return 'URF';
    case 'DOOMBOTSTEEMO':
      return 'Bots Infernales';
    case 'ONEFORALL':
      return 'Uno para Todos';
    case 'ASCENSION':
      return 'Ascension';
    case 'KINGPORO':
      return 'El Rey Poro';
    case 'SIEGE':
      return 'Asedio al Nexo';
    case 'ASSASSINATE':
      return 'Cacería de la Luna de Sangre';
    case 'ARSR':
      return 'Todos Aleatorios en el Puente del Carnicero';
    case 'DARKSTAR':
      return 'Singularity Oscura';
    case 'STARGUARDIAN':
      return 'Guardianas Estelares: Invasión';
    case 'PROJECT':
      return 'Proyecto: Sobrecarga';
    case 'GAMEMODEX':
      return 'Modo de Juego X';
    case 'ODYSSEY':
      return 'Odisea: Extracción';
    case 'NEXUSBLITZ':
      return 'Nexo Blitz';
    default:
      return '';
  }
}
