import functools
import os
import re
import sys
import traceback
from copy import deepcopy
from time import sleep

err_code = 0
err_type = "error"
KEY4_TRACK_CONV = {"1": "12", "2": "15", "3": "16", "6": "11"}
KEY6_TRACK_CONV = {"6": "11", "1": "12", "2": "13", "3": "14", "4": "15", "5": "16"}
KEY8_TRACK_CONV = {"1": "11", "2": "12", "3": "13", "4": "14", "5": "15", "8": "16", "6": "27", "9": "29"}
KEY_TRACK_CONV = {4: KEY4_TRACK_CONV, 6: KEY6_TRACK_CONV, 8: KEY8_TRACK_CONV, }
KEY4_MATCH = "#[0-9]{3}[1|5][^1|2|3|6]"
KEY6_MATCH = "#[0-9]{3}[1|5][7-9]"
KEY8_MATCH = "#[0-9]{3}[1|5]7"
DIFF_CONV = {"0": "trinity", "1": "hard", "2": "standard", "3": "standard"}

flag_31 = [False, False, False, False, False, False, False, False, False]
flag_bar_add = 0
flag_02 = 1

track03_weight = True


def _init():
    global err_code, flag_31, flag_bar_add, flag_02, err_type
    err_code = 0
    flag_31 = [False, False, False, False, False, False, False, False, False]
    flag_bar_add = 0
    flag_02 = 1
    err_type = "error"


# def fine_head(str):
#     global err_code
#     if str[0] != "#":
#         str = "#" + str
#     f.seek(0)
#     while 1:
#         l = f.readline()
#         if not l:
#             err_code = 101  #
#             return None
#         l = re.split(":| ", l)
#         if l[0] == str:
#             return [x for x in l if x]
#     err_code = 100
#     return None


def mint(i):
    if type(i) == int or type(i) == float:
        return i
    else:
        if type(eval(i)) == int:
            return int(i)
        else:
            return float(i)


def get_next_param(str):
    if str:
        str = re.split(":| ", str)
        if len(str) > 1:
            return str[1]
    return None


def get_header_filed(file_str):
    global err_code, err_type
    bpm = 0
    player = 0
    diff = 3
    ret = {}
    res = re.search("#BPM.*", file_str)
    if res:
        res = get_next_param(res.group())
        if res:
            bpm = mint(res)
    else:
        err_code = 102  # err_code_102 找不到#BPM
        return None
    ret["bpm"] = bpm
    res = re.search("#PLAYER.*", file_str)
    if res:
        res = get_next_param(res.group())
        if res:
            player = int(res)
    else:
        err_code = 103  # err_code_103 找不到#PLAYER
        err_type = "waring"
        # return None
    ret["player"] = player
    res = re.search("#RANK.*", file_str)
    if res:
        res = get_next_param(res.group())
        if res:
            diff = int(res)
    ret["diff"] = diff
    res = re.findall("#BPM[^ ].*", file_str)
    if res:
        ret["bpm_dic"] = {}
        for i in res:
            ret["bpm_dic"][i[4:6]] = i[7:]  # #BPM01 256
    return ret


def get_main_data_field(file_str):
    global err_code
    res = re.search("\n.{6}:", file_str)
    if not res.group():
        err_code = 105  # err_code_104 cant find MAIN DATA FIELD
        return None
    return file_str[res.span()[0] + 1:]


def gcd(a: int, b: int):
    return gcd(b, a % b) if a % b else b


def lcm(a: int, b: int):
    return a * b / gcd(a, b)


def track_merge(track1, track2):
    if len(track2) > len(track1):
        track1, track2 = track2, track1
    m = lcm(len(track1), len(track2))
    track1 = list(track1)
    mul = int(m / len(track1))
    for a in range(0, len(track1), 2):
        for b in range(0, mul - 1):
            track1.insert(a * mul + 2, "0")
            track1.insert(a * mul + 2, "0")
    track1 = "".join(track1)
    track2 = list(track2)
    mul = int(m / len(track2))
    for a in range(0, len(track2), 2):
        for b in range(0, mul - 1):
            track2.insert(a * mul + 2, "0")
            track2.insert(a * mul + 2, "0")
    track2 = "".join(track2)
    mul = 1
    for i in range(0, len(track2), 2):
        if track2[i:i + 2] != "00":
            track1 = list(track1)
            track1[i * mul:i * mul + 2] = track2[i:i + 2]
            track1 = "".join(track1)
    return track1


def key468_conv(main_data_lines, data, key_track_conv):
    global flag_31, flag_02
    for l in main_data_lines:
        track_str = l[1:4]
        channel_str = l[4:6]
        message_str = l[7:]
        if (not message_str) or (not channel_str) or (not track_str):
            print("ignore error line: " + l)
            continue
        track_str = str(int(track_str))
        if track_str not in data["data"]:
            data["data"][track_str] = {}
        bar = data["data"][track_str]
        if channel_str == "02":
            bar["2"] = message_str
            # flag_02 = float(message_str)
        elif channel_str == "03" or channel_str == "08":
            bpm_change = []
            bpm_change_bit = []
            bpm_change_len = 0
            for i in range(0, int(len(message_str) / 2)):
                bpm_change_len = i + 1
                if message_str[i * 2:i * 2 + 2] != "00":
                    bpm_change_bit.append(i)
                    bpm_change.append(int(message_str[i * 2:i * 2 + 2], 16) if channel_str == "03" else mint(
                        data["bpm_dic"][message_str[i * 2:i * 2 + 2]]))
            if "bpm_change" not in data:
                data["bpm_change"] = {}
            if track_str not in data["bpm_change"]:
                data["bpm_change"][track_str] = {}
            data["bpm_change"][track_str][channel_str] = {"bpm_change": bpm_change, "bpm_change_bit": bpm_change_bit,
                                                          "bpm_change_len": bpm_change_len}
        elif channel_str[0] == "1":
            line = ""
            for i in range(0, len(message_str), 2):
                line = line + ("00" if message_str[i:i + 2] == "00" else "11")
            if key_track_conv[channel_str[1]] in bar:
                line = track_merge(line, bar[key_track_conv[channel_str[1]]])
            bar[key_track_conv[channel_str[1]]] = line
        elif channel_str[0] == "5":
            line = ""
            for i in range(0, len(message_str), 2):
                if message_str[i:i + 2] == "00":
                    line = line + "00"
                else:
                    line = line + ("41" if flag_31[int(channel_str[1]) - 1] else "31")
                    flag_31[int(channel_str[1]) - 1] = not flag_31[int(channel_str[1]) - 1]
            if key_track_conv[channel_str[1]] in bar:
                line = track_merge(line, bar[key_track_conv[channel_str[1]]])
            bar[key_track_conv[channel_str[1]]] = line
        else:
            print("ignore: " + l)


def cmp(a, b):
    if int(a) > int(b):
        return 1
    elif int(a) < int(b):
        return -1
    else:
        return 0


def track0308_merge(bar):
    global track03_weight
    track03_weight_local = track03_weight
    if bar["03"]["bpm_change_len"] < bar["08"]["bpm_change_len"]:
        bar["03"], bar["08"] = bar["08"], bar["03"]
        track03_weight_local = not track03_weight_local
    mul = int(bar["03"]["bpm_change_len"] / bar["08"]["bpm_change_len"])
    if mul > 1:
        bar["08"]["bpm_change_len"] = bar["03"]["bpm_change_len"]
        for i in range(0, len(bar["08"]["bpm_change_bit"])):
            bar["08"]["bpm_change_bit"][i] = bar["08"]["bpm_change_bit"][i] * mul
    for i in range(0, len(bar["08"]["bpm_change_bit"])):
        fl = 1
        for j in range(0, len(bar["03"]["bpm_change_bit"])):
            if bar["08"]["bpm_change_bit"][i] < bar["03"]["bpm_change_bit"][j]:
                bar["03"]["bpm_change_bit"].insert(j, bar["08"]["bpm_change_bit"][i])
                bar["03"]["bpm_change"].insert(j, bar["08"]["bpm_change"][i])
                fl = 0
                break
            elif bar["08"]["bpm_change_bit"][i] == bar["03"]["bpm_change_bit"][j]:
                if track03_weight_local:
                    fl = 0
                    break
                else:
                    bar["03"]["bpm_change"][j] = bar["08"]["bpm_change"][i]
                    fl = 0
                    break
        if fl:
            bar["03"]["bpm_change_bit"].append(bar["08"]["bpm_change_bit"][i])
            bar["03"]["bpm_change"].append(bar["08"]["bpm_change"][i])
    bar["08"] = {}


def cmp2(a, b):
    if int(a) > int(b):
        return -1
    elif int(a) < int(b):
        return 1
    else:
        return 0


def insert_new_bar(data, bar_num: str, length: int):
    global flag_02
    next_bar = {}
    for i in sorted(data["data"], key=functools.cmp_to_key(cmp2)):
        if i == bar_num:
            next_bar["2"] = str(flag_02)
            break
        else:
            data["data"][str(int(i) + length)] = deepcopy(data["data"][i])
            next_bar = data["data"][str(int(i) + length)]
            del (data["data"][i])
    for i in sorted(data["bpm_change"], key=functools.cmp_to_key(cmp2)):
        if i == bar_num:
            break
        else:
            data["bpm_change"][str(int(i) + length)] = deepcopy(data["bpm_change"][i])
            next_bar = data["bpm_change"][str(int(i) + length)]
            del (data["bpm_change"][i])


def bpm_changed(data):
    global flag_02
    for i in sorted(data["data"], key=functools.cmp_to_key(cmp)):
        if "2" in data["data"][i]:  # 获取前一个节拍，便于复原
            flag_02 = mint(data["data"][i]["2"])
        if "bpm_change" not in data:
            return True
        if (i not in data["bpm_change"]) or data["bpm_change"][i] == {}:
            continue
        if "03" in data["bpm_change"][i] and "08" in data["bpm_change"][i]:  # 将08通道合并到03
            track0308_merge(data["bpm_change"][i])
        if "03" not in data["bpm_change"][i] and "08" in data["bpm_change"][i]:
            data["bpm_change"][i]["03"] = data["bpm_change"][i]["08"]
            data["bpm_change"][i]["08"] = {}
        if data["bpm_change"][i]["03"]["bpm_change_bit"][0] != 0:  # 如果变bpm不是从小节的头部开始的，在头部插入一个值为原先bpm(用0表示)的变速，方便写循环
            data["bpm_change"][i]["03"]["bpm_change_bit"].insert(0, 0)
            data["bpm_change"][i]["03"]["bpm_change"].insert(0, 0)
        bar_old = deepcopy(data["data"][i])
        l = len(data["bpm_change"][i]["03"]["bpm_change_bit"])
        if l > 1:
            insert_new_bar(data, i, l - 1)
        for k in range(0, l):
            bar_start_at = data["bpm_change"][i]["03"]["bpm_change_bit"][k]
            next_bar = data["bpm_change"][i]["03"]["bpm_change_len"] if k + 1 == len(
                data["bpm_change"][i]["03"]["bpm_change_bit"]) else data["bpm_change"][i]["03"]["bpm_change_bit"][k + 1]
            bar_len = next_bar - bar_start_at
            new_bar = data["data"][str(int(i) + k)] = {}
            if data["bpm_change"][i]["03"]["bpm_change"][k] != 0:
                new_bar["1"] = data["bpm_change"][i]["03"]["bpm_change"][k]
            new_bar["2"] = flag_02 * bar_len / data["bpm_change"][i]["03"]["bpm_change_len"]
            for j in bar_old:
                if int(j) < 11:
                    continue
                if int(len(bar_old[j]) / 2) < data["bpm_change"][i]["03"]["bpm_change_len"]:
                    mul = int(data["bpm_change"][i]["03"]["bpm_change_len"] / int(len(bar_old[j]) / 2))
                    bar_old[j] = list(bar_old[j])
                    for a in range(0, len(bar_old[j]), 2):
                        for b in range(0, mul - 1):
                            bar_old[j].insert(a * mul + 2, "0")
                            bar_old[j].insert(a * mul + 2, "0")
                    bar_old[j] = "".join(bar_old[j])
                mul = int(int(len(bar_old[j]) / 2) / data["bpm_change"][i]["03"]["bpm_change_len"])
                new_bar[j] = bar_old[j][bar_start_at * 2 * mul:(bar_start_at * 2 + bar_len * 2) * mul]
        del (data["bpm_change"][i])
        return False
    return True


def key8_2733_conv(data):
    for i in data["data"]:
        bar = data["data"][i]
        if "27" in bar:
            if "31" in bar["27"] or "41" in bar["27"]:
                bar["31"] = deepcopy(bar["27"])
                bar["31"] = re.sub("((31)|(41))", "01", bar["31"])
                bar["31"] = re.sub("11", "00", bar["31"])
                bar["27"] = re.sub("((31)|(41))", "00", bar["27"])
            bar["27"] = re.sub("11", "01", bar["27"])
        if "29" in bar:
            if "31" in bar["29"] or "41" in bar["29"]:
                bar["33"] = deepcopy(bar["29"])
                bar["33"] = re.sub("((31)|(41))", "01", bar["33"])
                bar["33"] = re.sub("11", "00", bar["33"])
                bar["29"] = re.sub("((31)|(41))", "00", bar["29"])
            bar["29"] = re.sub("11", "01", bar["29"])


def pre_save(data):
    while True:
        if bpm_changed(data):
            break
    key8_2733_conv(data)


def save_data(data):
    pre_save(data)
    save_file_name = data["file_name"][:-4] + "_" + str(data["key_type"]) + "k_" + DIFF_CONV[
        str(data["diff"])] + "_pc.txt"
    out = open(save_file_name, "wb")
    for i in sorted(data["data"], key=functools.cmp_to_key(cmp)):
        if data["data"][i] == {}:
            continue
        out.write((i + ":\r\n").encode())
        for j in sorted(data["data"][i], key=functools.cmp_to_key(cmp)):
            out.write((j + "," + str(data["data"][i][j]) + "," + "\r\n").encode())
        out.seek(-3, 1)
        out.write(";\r\n\r\n".encode())

    out.close()


def conv(file_name):
    global err_code
    key_type = 4
    f = open(file_name)
    file_str = f.read()
    header_filed = get_header_filed(file_str)
    if not header_filed:
        return None
    header_filed["file_name"] = file_name
    if header_filed["player"] > 2:
        err_code = 104  # err_code_104 #PLAYER>2
        return None
    main_data_field = get_main_data_field(file_str)
    if not main_data_field:
        return None
    main_data_lines = [x for x in main_data_field.splitlines() if x]
    main_data_lines.sort()
    data = {**header_filed, "data": {}}
    data["data"]["0"] = {"1": str(data["bpm"])}
    if not re.search(KEY4_MATCH, main_data_field):
        key_type = 4
        data["key_type"] = 4
        key468_conv(main_data_lines, data, KEY4_TRACK_CONV)
    elif not re.search(KEY6_MATCH, main_data_field):
        key_type = 6
        data["key_type"] = 6
        key468_conv(main_data_lines, data, KEY6_TRACK_CONV)
    elif not re.search(KEY8_MATCH, main_data_field):
        key_type = 8
        data["key_type"] = 8
        key468_conv(main_data_lines, data, KEY8_TRACK_CONV)
    save_data(data)

    f.close()


# print(l.span())
# print(l.group())
if __name__ == "__main__":
    # track_merge("001100110000110000110000001100110011000011000000", "1111")
    files = sys.argv[1:]
    for file in files:
        try:
            print(file + ":")
            _init()
            conv(file)
            if err_code:
                print(err_type + ": error code " + str(err_code))
            else:
                print("convert success")
        except:
            traceback.print_exc()
            sleep(0.1)
            print("try next file...")
    os.system("pause")
