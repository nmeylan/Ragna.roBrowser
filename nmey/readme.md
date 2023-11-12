http-server -p 8000


wsproxy -a 127.0.0.1:6901,127.0.0.1:6900,127.0.0.1:5121,127.0.0.1:6121

working commit 8cfd52e




notes bug movement:
"nmeylan — Hier à 15:05
@Antares is the behavior when an entity is attacked while moving correct? It seems that movement is stopped when entity(player or mob) is hit, but if i remember movement should just be delayed. Unfortunately i don't have original client to compare with

Antares — Hier à 15:25
Probably this is the most complicated stuff ro has
[15:25]
Our version is not 100% accurate
[15:28]
if you are walking from A cell to B and you get hit, you will receive a packet with damage and attack motions. After the attack motion delay elapses, the character displays the flintch action (if not endure endure) and it will last attackedmotion amount of seconds. After that the character should resumbe moving to the targeted cell (modifié)
[15:28]
If you are walking to an entity then the walking is not resumed

nmeylan — Hier à 15:29
ok, i will investigate why the movement is not resumed

Antares — Hier à 15:29
we lack the resume part
[15:29]
I know the reason
[15:29]
it is just complicated because we lack states
[15:29]
we only have actions
[15:29]
original ro has walk state and walk action

nmeylan — Hier à 15:30
yes i saw

Antares — Hier à 15:30
if you get hit the action will be damaged
[15:30]
but the state remains walk
[15:30]
and thus it resumes after the action is set to stand

nmeylan — Hier à 15:30
i have implemented that server side but the logic is not the same in the client

Antares — Hier à 15:30
we dont have the entire state part

kontownik — Hier à 15:33
that was bugged even in official client setup (eAthena + pre-re client). That's why some servers had @ refresh command, player was positioned badly after hit

nmeylan — Hier à 15:34
yeah probably but in my memories movement while hit was a bit smoother that it is in robrowser

Antares — Hier à 15:35
it is really impossible to prevent server and client position desync because of latency
[15:35]
ro is pretty bad in this part
[15:35]
but we are somewhat decent in this part
[15:35]
at least better than before
[15:36]
but this state/action thing would be a game changer if we can fix it
[15:36]
many things depend on it which we just dodge rn
[15:36]
via clever "hacks"
[15:36]


nmeylan — Hier à 15:37
should i create an issue and you fill with details?

Antares — Hier à 15:37
sure why not
[15:38]
one thing we can't fix in the current state is: when a mob gets frozen on official server the action is also frozen but the entity still slides to the cell it is really standing on (modifié)
[15:38]
we can't have both rn
[15:38]
because walking/moving is tied to the action"
