# Formatting

## Time/Result

Timed attempts will follow [this](https://www.worldcubeassociation.org/export/results) format:

- For all events

  - `result = -1` means DNF
  - `result = -2` means DNS
  - `result = 0` means no result (do not show)
  - `result = null` means some API error (do not display, or display as "??")

- For all events (except fewest moves [333fm] and multi blind [333mbld]):
  - `result = time / 100`
- For fewest moves (333fm):
  - `result = int(time)`
- For multi blind (333mbld):
  - there is no average
  - two possible decodes:
    - old: 1SSAATTTTT
      - solved = 99 - SS
      - attempted = AA
      - timeInSeconds = TTTTT (99999 means unknown)
    - new: 0DDTTTTTMM
      - difference = 99 - DD
      - timeInSeconds = TTTTT (99999 means unknown)
      - missed = MM
      - solved = difference + missed
      - attempted = solved + missed
  - how to display:
    - "solved/attempted (time in seconds)"
  - example:
    - `result = 660319902` (current best of competitor 2017SEMO02)
    - difference = [from result] -> 99 - 66 = 33
    - time = [from result] -> 03199 = 53:19
    - missed = [from result] -> 02
    - solved = [combining difference + missed] -> 33 + 02 = 35
    - attempted = [combining solved + missed] -> 35 + 02 = 37
    - display as `35/37 53:19`
