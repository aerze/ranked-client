export interface Player {
  _id: string;
  name: string;
  mu: number;
  sigma: number;
  teamId?: string;
}

export function formatSkill(player: Player) {
  return Math.floor(player.mu * 100);
}

export function formatCertainty(player: Player) {
  return Math.floor(player.sigma * 100);
}
