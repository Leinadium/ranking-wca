# Formatting

## Time/Result

Timed attempts will follow [this](https://www.worldcubeassociation.org/export/results) format:

* For fewest moves (333fm):
  * `result = int(time)`
* For all other events (except multi blind, 333mbld):
  * `result = time / 100`
* For multi blind (333mbld):
  * two possible decodes:
    * old: 1SSAATTTTT
      * solved        = 99 - SS
      * attempted     = AA
      * timeInSeconds = TTTTT (99999 means unknown)
    * new: 0DDTTTTTMM
      * difference    = 99 - DD
      * timeInSeconds = TTTTT (99999 means unknown)
      * missed        = MM
      * solved        = difference + missed
      * attempted     = solved + missed
  * how to show:
    * "solved/attempted (time in seconds)"
