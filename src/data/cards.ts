// ============================================================
// LAPSE — Mock Card Data (10 cards, one per day)
// ============================================================

import { CardData } from "@/lib/game/gameTypes";

export const cards: CardData[] = [
  {
    id: "day-01",
    day: 1,
    title: "The Opening Tremor",
    description:
      "A faint tremor ripples through the city at dawn. Citizens look to you for guidance. Act swiftly—or wait and observe?",
    leftChoice: "Issue an immediate city-wide alert",
    rightChoice: "Monitor the situation quietly",
    leftEffect: -8,
    rightEffect: 5,
  },
  {
    id: "day-02",
    day: 2,
    title: "Supply Line Fracture",
    description:
      "Key supply routes are damaged. Resources are limited. Redirect what remains, or ration?",
    leftChoice: "Redirect all supplies to shelters",
    rightChoice: "Enforce strict rationing",
    leftEffect: 10,
    rightEffect: -5,
  },
  {
    id: "day-03",
    day: 3,
    title: "Whispers of Unrest",
    description:
      "Rumors spread faster than facts. A crowd is forming in the central plaza. Do you address them or deploy security?",
    leftChoice: "Address the crowd directly",
    rightChoice: "Send in security patrols",
    leftEffect: 7,
    rightEffect: -12,
  },
  {
    id: "day-04",
    day: 4,
    title: "The Blackout",
    description:
      "Power grids fail across the eastern district. Engineers propose two solutions—neither is guaranteed.",
    leftChoice: "Reroute power from the west",
    rightChoice: "Attempt emergency repairs",
    leftEffect: -6,
    rightEffect: 12,
  },
  {
    id: "day-05",
    day: 5,
    title: "A Stranger's Offer",
    description:
      "An unknown faction offers aid in exchange for influence. Their intentions are unclear.",
    leftChoice: "Decline and stay independent",
    rightChoice: "Accept the offer cautiously",
    leftEffect: -15,
    rightEffect: 8,
  },
  {
    id: "day-06",
    day: 6,
    title: "Flooding in Sector 7",
    description:
      "Rising water threatens the lower districts. Evacuate now, or reinforce the barriers?",
    leftChoice: "Begin immediate evacuation",
    rightChoice: "Reinforce the flood barriers",
    leftEffect: 5,
    rightEffect: -10,
  },
  {
    id: "day-07",
    day: 7,
    title: "The Broadcast Signal",
    description:
      "An encrypted broadcast is intercepted. It could be a warning—or a trap. Decode it, or ignore it?",
    leftChoice: "Allocate resources to decode it",
    rightChoice: "Ignore and focus elsewhere",
    leftEffect: 10,
    rightEffect: -8,
  },
  {
    id: "day-08",
    day: 8,
    title: "Medical Emergency",
    description:
      "Medical supplies are nearly exhausted. A risky trade is available—but at what cost?",
    leftChoice: "Attempt the trade deal",
    rightChoice: "Ration remaining supplies",
    leftEffect: -20,
    rightEffect: 6,
  },
  {
    id: "day-09",
    day: 9,
    title: "The Final Warning",
    description:
      "A massive event looms on the horizon. Prepare defences, or plan for escape?",
    leftChoice: "Fortify all positions",
    rightChoice: "Plan an evacuation route",
    leftEffect: 12,
    rightEffect: -5,
  },
  {
    id: "day-10",
    day: 10,
    title: "Day of Reckoning",
    description:
      "Everything comes to a head. The city's fate rests on one final decision. Stand your ground—or let go?",
    leftChoice: "Stand and fight to the end",
    rightChoice: "Accept the outcome and adapt",
    leftEffect: -10,
    rightEffect: 15,
  },
];

export function getCardForDay(day: number): CardData | undefined {
  return cards.find((c) => c.day === day);
}
