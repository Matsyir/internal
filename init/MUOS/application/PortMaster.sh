#!/bin/sh

if pgrep -f "playbgm.sh" >/dev/null; then
	killall -q "playbgm.sh" "mp3play"
fi

if pgrep -f "muplay" >/dev/null; then
	killall -q "muplay"
	rm "$SND_PIPE"
fi

echo app >/tmp/act_go

. /opt/muos/script/var/func.sh

. /opt/muos/script/var/device/storage.sh

export HOME=/root

echo "portmaster" >/tmp/fg_proc

nice --20 "${DC_STO_ROM_MOUNT}"/MUOS/PortMaster/PortMaster.sh
