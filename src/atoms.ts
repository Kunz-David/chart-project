import {atom} from "jotai"
import {ChartData} from "./types.ts"
import {fetchChartData} from "./data.ts"

export const selectedDatumAtom = atom<ChartData | null>(null)
export const dataAtom = atom(async () => fetchChartData())