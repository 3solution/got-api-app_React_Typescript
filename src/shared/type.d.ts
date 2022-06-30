type SelectOptionType = {
  label: string;
  value: string;
};

type CharacterType = {
  name: string;
  alive: string;
  gender: string;
  culture: string;
  houseDetail: SelectOptionType[];
};

type HouseDetailsType = {
  name: string;
  region: string;
  costOfArms: string;
  words: string;
  titles: string[];
  seats: string[];
  diedOut: string;
  overlord: string;
  cadetBranches: number;
};
