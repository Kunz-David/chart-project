import {atom} from "jotai"
import {ChartData} from "./types.ts"

export const selectedDatumAtom = atom<ChartData | null>(null)