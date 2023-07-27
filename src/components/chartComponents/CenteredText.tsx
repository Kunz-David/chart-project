import {Text} from '@visx/text'
import {Margin} from "../../types.ts"

interface CenteredTextProps {
  text: string
  innerWidth: number
  innerHeight: number
  margin: Margin
}

export function CenteredText({text, innerWidth, innerHeight, margin}: CenteredTextProps) {

  return (
    <Text
      x={margin.left + innerWidth / 2}
      y={innerHeight / 2}
      width={innerWidth}
      verticalAnchor="middle"
      textAnchor="middle"
      fontFamily="Arial"
      fontSize={24}
      fontWeight={800}
      fill="#333"
    >
      {text}
    </Text>
  )
}
