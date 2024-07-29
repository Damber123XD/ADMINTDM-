;
//var Color =
importNamespace('PixelCombats. Scripting Api. Structures')
//var System = importNamespace('System');
// константы
var Waiting PlayersTime = 1;
var BuildBaseTime = 1;
var Game ModeTime = 0;
var EndOfMatchTime = 1;
// константы имен
var Waiting StateValue = "Waiting";
var BuildModeStateValue = "BuildMode";
var GameStateValue = "Game";
var EndOfMatch StateValue = "EndOfMatch";

// примен€ем параметры создание комнаты
Damage. Friendly Fire =
GameMode.Parameters.GetBool ("Friendly Fire");
Map. Rotation =
GameMode.Parameters.GetBool ("Map Rotation");
Breack Graph. Only Player Blocks Dmg:
GameMode.Parameters.GetBool ("PartialDesruction");
Breack Graph.Weak Blocks =
GameMode.Parameters.GetBool ("Loosen Blocks");
// блок игрока всегда усилен
Breack Graph.Player Block Boost = true;
// блок игрока всегда усилен
Breack Graph.Player Block Boost = true;
// параметры игры
Properties.GetContext().GameModeName.Value =
"GameModes/Team Dead Match";
Teams Balancer. IsAutoBalance = true;
Ui.GetContext().MainTimerId.Value = mainTimer.Id;
// создаем команды
Teams.Add("Blue", "ТЫ СИНИЙ!", { r: 1, g: 1, b: 1 });
Teams.Add("Red", "ТЫ КРАСНЫЙ!", {r: 0, g: 22, b: 135 });
var blueTeam = Teams.Get("Blue");
var red Team = Teams.Get("Red");
blueTeam.Spawns.Spawn Points Groups.Add(1);
red Team. Spawns.Spawn Points Groups.Add(2);
blueTeam.Build.Blocks Set.Value = BuildBlocks Set. Blue;
red Team.Build.Blocks Set.Value = BuildBlocks Set.Red;

// задаем макс смертей команд
var maxDeaths Players. MaxCount * Infinity;
Teams.Get("Red"). Properties.Get("Deaths").Value =
maxDeaths;
Teams.Get("Blue"). Properties.Get("Deaths").Value =
maxDeaths;
// задаем что выводить в лидербордах
Leader Board.PlayerLeader Board Values = [
{
Value: "Kills",
DisplayName: "Statistics/Kills",
ShortDisplayName: "Statistics/Kills Short"
},
{
},
Value: "Deaths",
DisplayName: "Statistics/Deaths",
ShortDisplayName: "Statistics/Deaths Short"
},
{
}
];
Value: "Spawns",
DisplayName: "Statistics/Spawns",
ShortDisplayName: "Statistics/Spawns Short"
Value: "Scores",
DisplayName: "Statistics/Scores",
ShortDisplayName: "Statistics/ScoresShort"
Leader Board. Team Leader Board Value = {
};
Value: "Deaths",
DisplayName: "Statistics\Deaths",
ShortDisplayName: "Statistics\Deaths"
// вес команды в лидерборде
Leader Board. TeamWeightGetter. Set(function(team) {
return team. Properties.Get("Deaths").Value;

});
// вес игрока в лидерборде
Leader Board.
});
PlayersWeightGetter.Set(function(player) {
return player. Properties.Get("Kills").Value;
// задаем что выводить вверху
Ui.GetContext().TeamProp1.Value = { Team: "Blue",
Prop: "Deaths" };
Ui.GetContext().TeamProp2.Value = { Team: "Red",
Prop: "Deaths"};
// разрешаем вход в команды по запросу
Teams. OnRequestJoinTeam. Add(function(player, team)
{team.Add(player);});
// спавн по входу в команду
Teams.OnPlayerChangeTeam.Add(function(player)
{ player. Spawns. Spawn()});

// делаем игроков неу€звимыми после спавна
var immortality Timer Name="immortality";
Spawns.GetContext(). OnSpawn.Add(function(player){
player. Properties. Immortality. Value=true;
timer-player.Timers. Get (immortality Timer Name). Restart(5)
;
});
Timers.OnPlayerTimer.Add(function(timer){
});
if(timer.Id! immortality Timer Name) return;
timer. Player. Properties. Immortality.Value = false;
// после каждой смерти игрока отнимаем одну
смерть в команде
Properties.OnPlayer Property.Add(function(context, value)
{
});
if (value.Name !== "Deaths") return;
if (context. Player. Team == null) return;
context.Player. Team. Properties.Get("Deaths").Value--;

// если в команде количество смертей
занулилось то завершаем игру
Properties. OnTeam Property. Add(function(context, value) {
if (value.Name !== "Deaths") return;
});
if (value. Value <= 0) SetEndOfMatchMode();
// счетчик спавнов
Spawns. OnSpawn.Add(function(player) {
++player. Properties. Spawns. Value;
});
// счетчик смертей
Damage. On Death. Add(function(player) {
});
++player. Properties. Deaths. Value;
// счетчик убийств
Damage. OnKill.Add(function(player, killed) {
});
if (killed. Team != null && killed. Team != player. Team) {
}
++player. Properties.Kills. Value;
player. Properties.Scores. Value += 100;

// настройка переключение режимов
mainTimer.OnTimer.Add(function() {
});
switch (state Prop.Value) {
case Waiting StateValue:
SetBuildMode();
break;
case BuildModeStateValue:
SetGameMode();
break;
case GameStateValue:
SetEndOfMatch Mode();
break;
case EndOfMatch StateValue:
}
RestartGame();
break;
// задаем первое игровое состо€ние
SetWaitingMode();

// состоєниє игры
function SetWaitingMode() {
}
state Prop.Value = WaitingStateValue;
Ui.GetContext(). Hint.Value = "Hint/OT LOL!";
Spawns.GetContext().enable = false;
mainTimer. Restart (Waiting Players Time);
function Set BuildMode()
{
state Prop.Value = BuildModeStateValue;
Ui.GetContext(). Hint.Value = "Hint/BuildBase";
var inventory = Inventory.GetContext();
inventory.MainInfinity.Value = false;
inventory. Secondary Infinity.Value = false;
inventory. Melee.Value = true;
inventory.Explosive Infinity.Value = false;
inventory.Build.Value = true;
inventory.BuildInfinity.Value = true;
}
mainTimer. Restart(BuildBaseTime);
Spawns.GetContext().enable = true;
SpawnTeams();
function SetGameMode()
{
state Prop.Value = GameStateValue;
Ui.GetContext(). Hint.Value = "Hint/AttackEnemies";
var inventory = Inventory.GetContext();
if (GameMode.Parameters.GetBool ("OnlyKnives")) {
inventory.MainInfinity.Value = false;
inventory. Secondary Infinity.Value = false;
inventory. MeleeInfinity.Value = true;
inventory.Explosive Infinity.Value = false;
inventory.Explosive Infinity.Value = false;
inventory.Build.Value = true;
} else {
}
inventory.Main.Value = true;
inventory. Main Infinity.Value = true;
inventory. Secondary.Value = true;
inventory. Secondary Infinity.Value = true;
inventory.Melee.Value = true;
inventory.Explosive Infinity.Value = true;
inventory.Explosive Infinity.Value = true;
}
inventory.Build.Value = true;
mainTimer. Restart (GameModeTime);
Spawns.GetContext().Despawn();
SpawnTeams();
function SetEndOfMatch Mode() {
state Prop.Value = EndOfMatchStateValue;
Ui.GetContext().Hint.Value = "Hint/!!!";
}
var spawns Spawns.GetContext();
spawns.enable = false;
spawns. Despawn();
Game.Game Over (Leader Board. Get Teams());
mainTimer. Restart(EndOfMatchTime);
function RestartGame() {
Game. RestartGame();
}
function SpawnTeams() {
var e=Teams.GetEnumerator();
while (e.moveNext()) {
}
Spawns.GetContext(e. Current). Spawn();
}
Build.GetContext().FlyEnable. Value
true;
