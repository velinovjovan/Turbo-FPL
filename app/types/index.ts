import type React from "react";

export type FplBootstrapEvent = {
  is_current: boolean;
  id: number;
};

export type FplBootstrapPlayer = {
  id: number;
  web_name: string;
  now_cost: number;
  starts: number;
  minutes: number;
  bps: number;
  bonus: number;
  assists: number;
  goals_scored: number;
  expected_assists: string;
  expected_assists_per_90: number;
  expected_goal_involvements: string;
  expected_goal_involvements_per_90: number;
  expected_goals: string;
  total_points: number;
  element_type: number;
  points_per_game?: string;
  clean_sheets?: number;
  saves?: number;
  yellow_cards?: number;
  expected_goals_conceded?: string;
  selected_by_percent?: string;
  photo?: string;
  cost_change_start?: number;
  cost_change_event?: number;
  transfers_in_event?: number;
  transfers_out_event?: number;
  transfers_in?: number;
  transfers_out?: number;
  predicted_points?: number | null;
};

export type FplBootstrapData = {
  elements: FplBootstrapPlayer[];
  events: FplBootstrapEvent[];
  total_players: number;
};

export type FplTeamSummary = {
  name: string;
  player_first_name: string;
  player_last_name: string;
  current_event: number;
  summary_event_points: number;
};

export type FplPick = {
  element: number;
  multiplier: number;
  position: number;
};

export type FplEntryHistory = {
  total_points: number;
  value: number;
  overall_rank: number;
  rank: number;
  bank?: number;
};

export type FplTeamHistory = {
  picks: FplPick[];
  active_chip: string;
  automatic_subs: unknown[];
  entry_history: FplEntryHistory;
};

export type FplLivePlayer = {
  stats: {
    total_points: number;
  };
  id: number;
};

export type FplChipHistory = {
  chips: {
    name: string;
  }[];
};

export type ChipProps = {
  name: string;
  code: string;
  status: string;
  isActive?: boolean;
};

export type CardProps = {
  children: React.ReactNode;
  title: string;
  parag: string;
};

export type MenuIconProps = {
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  navbar: boolean;
};

export type NavElProps = {
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  path: string;
};

export type NavMainProps = {
  children: React.ReactNode;
  navbar: boolean;
};

export type PlayerCardProps = {
  photo: string;
  name: string;
  score: number;
  multiplier: number;
};

export type PriceCompProps = {
  name: string;
  cost: number;
  progress: number;
  index?: number;
};

export type PricePlayer = {
  progress: number;
  cost_change_start: number;
  cost_change_event: number;
  transfers_in_event: number;
  transfers_out_event: number;
  transfers_in: number;
  transfers_out: number;
  selected_by_percent: string;
  web_name: string;
  now_cost: number;
  id: number;
};

export type TableCompProps = {
  player: FplBootstrapPlayer;
  index?: number;
};

export type TableOptaProps = {
  Data: {
    elements: FplBootstrapPlayer[];
  };
};

export type TablePredictProps = {
  Data: {
    elements: FplBootstrapPlayer[];
    events: FplBootstrapEvent[];
  };
};

export type TablePriceProps = {
  sortedPlayers: PricePlayer[];
};

export type ChipTableProps = {
  active_chip: string;
  id: number;
};

export type FplBootstrapContextValue = {
  bootstrap: FplBootstrapData | null;
  isLoading: boolean;
  error: boolean;
};
