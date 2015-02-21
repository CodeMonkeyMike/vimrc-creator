from os.path import expanduser
import re
import json
out = list()
outSett = '{'
with open(expanduser("~/.vimrc"), "r") as x, open("testVimrc", "w") as y:
    # Split each line into a string
    vrc = x.read().split('\n')
    # Remove blank lines
    vrc = [line for line in vrc if line.strip()]
    # Remove comments
    vrc = [line for line in vrc if re.match('^"', line) is None]
    s = [line for line in vrc if re.match('^(set )', line) is not None]
    for line in s:
        o = line.split(' ')
        for n in range(len(o[1:])):
            os = o[n+1].split('=')
            if re.match('^(no)', os[0]) is not None:
                out.append({'set': os[0][2:], 'option': 'off'})
            else:
                if len(os) is 2:
                    out.append({'set': os[0], 'option': os[1]})
                elif len(os) is 1:
                    out.append({'set': os[0]})
                else:
                    print("something is wrong")
    for sett in out:
        outSett += '"' + sett["set"] + '": ' + ('{"option": "' + sett["option"] + '"},\n' if "option" in sett else '{},\n')
    outSett += '}'
    y.write(outSett)
