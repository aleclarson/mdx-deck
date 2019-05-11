import React from 'react'
import { useDeck } from './context'
import useSteps from './useSteps'
import { Step } from './useStep'

export const Steps = ({ items, length, render }) => {
  const step = useSteps(items ? items.length : length)
  if (items) {
    return (
      <div>
        {items.map(
          (item, i) =>
            step >= i && (
              <Step key={i} index={i}>
                {typeof item == 'function' ? item(i) : item}
              </Step>
            )
        )}
      </div>
    )
  }
  return render({ step })
}

export default Steps
