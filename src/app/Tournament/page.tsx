import { Key } from "react";

// utils/generateBracket.js
// utils/generateBracket.js
export function generateBracket(teams: (string | null)[]) {
    const totalSpots = 52;
    const paddedTeams: (string | null)[] = [...teams];
  
    // Fill up remaining spots with nulls
    while (paddedTeams.length < totalSpots) {
      paddedTeams.push(null);
    }
  
    const shuffled = [...paddedTeams].sort(() => Math.random() - 0.5);
    const leftSide = shuffled.slice(0, 32);
    const rightSide = shuffled.slice(32);
  
    function buildRounds(sideTeams: string[]) {
      const rounds = [];
      let currentRound = [];
  
      // First round pairing
      for (let i = 0; i < sideTeams.length; i += 2) {
        const team1 = sideTeams[i] || null;
        const team2 = sideTeams[i + 1] || null;
        currentRound.push({ team1, team2 });
      }
  
      rounds.push(currentRound);
  
      let prevRound = currentRound;
  
      // Simulate winners and build next rounds
      while (prevRound.length > 1) {
        const nextRound = [];
  
        for (let i = 0; i < prevRound.length; i += 2) {
          const match1 = prevRound[i];
          const match2 = prevRound[i + 1];
  
          const winner1 = simulateWinner(match1.team1, match1.team2);
          const winner2 = match2 ? simulateWinner(match2.team1, match2.team2) : null;
  
          nextRound.push({ team1: winner1, team2: winner2 });
        }
  
        rounds.push(nextRound);
        prevRound = nextRound;
      }
  
      return rounds;
    }
  
    function simulateWinner(team1: string | null, team2: string | null): string | null {
      if (team1 && !team2) return team1;
      if (!team1 && team2) return team2;
      if (!team1 && !team2) return null;
      return Math.random() < 0.5 ? team1 : team2;
    }
  
    const leftRounds = buildRounds(leftSide);
    const rightRounds = buildRounds(rightSide).reverse(); // final round on top
    const finalRound = [{ team1: null, team2: null }];
  
    return { leftRounds, rightRounds, finalRound };
  }
  
  
  // components/Bracket.jsx
  type BracketProps = {
    leftRounds: Array<Array<{ team1: string | null; team2: string | null }>>;
    rightRounds: Array<Array<{ team1: string | null; team2: string | null }>>;
    finalRound: Array<{ team1: string | null; team2: string | null }>;
  };
  
  export function Bracket({ leftRounds, rightRounds, finalRound }: BracketProps) {
    const maxRounds = Math.max(leftRounds.length, rightRounds.length);
  
    const MatchBox = ({ team, isTop }: { team: string | null; isTop: boolean }) => (
      <div className={`border p-2 rounded shadow w-40 h-10 flex items-center justify-center text-sm font-semibold ${isTop ? "mb-2" : "mt-2"}`}>
        {team || 'TBD'}
      </div>
    );
  
    const MatchLines = ({ className }: { className: string }) => (
      <div className={`w-px h-4 bg-gray-400 mx-auto ${className}`} />
    );
  
    return (
      <div className="flex p-4 gap-5">
        {/* Left Side */}
        <div className="flex gap-4 w-fit h-full items-cnter justify-end">
          {leftRounds.map((round: any[], roundIndex: Key | null | undefined) => (
            <div key={roundIndex} className={`flex flex-col items-center relative h-full ${roundIndex === 1 && 'justify-start gap-15'} ${roundIndex === 2 && 'justify-end gap-30'} ${roundIndex===3&& 'justify-end gap-60'} ${roundIndex===4&& 'justify-end gap-120'}`}>
              <h2 className="mb-2 font-bold">Round {typeof roundIndex === 'number' ? roundIndex + 1 : ''}</h2>
              {round.map((match, matchIndex) => (
                <div key={matchIndex} className={`flex flex-col items-center h-full my-4 relative ${roundIndex === 1 && `gap-10`} ${roundIndex === 2 && `gap-20`} ${roundIndex ===3 && 'gap-40'} ${roundIndex === 4 && `gap-80`}`}>
                  <MatchBox team={match.team1} isTop={true} />
                  <MatchLines className={''} />
                  <MatchBox team={match.team2} isTop={false} />
                </div>
              ))}
            </div>
          ))}
          {[...Array(maxRounds - leftRounds.length)].map((_, i) => (
            <div key={`empty-left-${i}`} className="w-40"></div>
          ))}
        </div>
  
        {/* Final Match */}
        <div className="flex gap-4 items-center"></div>
        <div className="flex flex-col items-center justify-start gap-120 relative">
          <h2 className="mb-2 font-bold">Final</h2>
          <div className="flex flex-col items-center my-4 gap-80">
            <MatchBox team={finalRound[0].team1} isTop={true} />
            <MatchLines className=""/>
            <MatchBox team={finalRound[0].team2} isTop={false} />
          </div>
        </div>
  
        {/* Right Side */}
        <div className="flex gap-4 w-fit h-full items-cnter justify-start">
          {rightRounds.map((round: Array<{ team1: string | null; team2: string | null }>, roundIndex: Key | null | undefined) => (
              <div key={roundIndex} className={`flex flex-col items-center  relative h-full ${roundIndex === 0 && 'justify-start gap-120'} ${roundIndex === 1 && 'justify-end gap-60'} ${roundIndex===2&& 'justify-end gap-30'} ${roundIndex===3&& 'justify-end gap-15'}`}>
              <h2 className="mb-2 font-bold">Round {typeof roundIndex === 'number' ? rightRounds.length - roundIndex : ''}</h2>
              {/* {console.log(typeof roundIndex === 'number' && rightRounds.length - roundIndex)} */}
              {round.map((match: { team1: string | null; team2: string | null }, matchIndex: Key | null | undefined) => (
                  <div key={matchIndex} className={`flex flex-col items-center h-full my-4 relative ${roundIndex === 0 &&`gap-80`} ${roundIndex === 1 && `gap-40`} ${roundIndex ===2 && 'gap-20'} ${roundIndex === 3 && `gap-10`}`}>
                  <MatchBox team={match.team1} isTop={true} />
                  <MatchLines className="" />
                  <MatchBox team={match.team2} isTop={false} />
                </div>
              ))}
            </div>
          ))}
          {[...Array(maxRounds - rightRounds.length)].map((_, i) => (
            <div key={`empty-right-${i}`} className="w-40"></div>
          ))}
        </div>
      </div>
    );
  }
  
  // app/bracket/page.jsx
  //import { Bracket } from "@/components/Bracket";
  //import { generateBracket } from "@/utils/generateBracket";
  
  const teams = [
    "Red Dragons", "Blue Hawks", "Golden Eagles", "Silver Sharks",
    "Black Panthers", "Green Goblins", "Purple Vipers", "White Wolves",
    "Crimson Foxes", "Shadow Knights", "Iron Giants", "Lava Lizards",
    "Storm Bears", "Ocean Orcas", "Flame Tigers", "Sky Falcons",
    "Night Owls", "Frost Bats", "Thunder Bulls", "Blazing Bison",
    "Desert Coyotes", "Steel Serpents", "Ghost Ravens", "Jungle Jaguars",
    "Toxic Turtles", "Rock Rhinos", "Ice Yetis", "Solar Lions",
    "Plasma Penguins", "Amber Antelopes", "Obsidian Ocelots", "Cyber Cougars",
    "Molten Monkeys", "Laser Llamas", "Vortex Vultures", "Stormy Stallions",
    "Galaxy Goats", "Blizzard Badgers", "Electric Emus", "Quantum Quokkas",
    "Crystal Crocodiles", "Bionic Baboons", "Lunar Leopards", "Meteor Mambas",
    "Titan Tarantulas", "Echo Eagles", "Delta Dingoes", "Nova Newts",
    "Blazing Beetles", "Cobalt Cobras", "Astral Alpacas", "Phantom Phoenixes",
    "jbfjh jhbcjb","cjih uuhu","uygdud uygdugd","ugdu ihihd","udu hihd","dgduge uu",
    "gcc jjj","scu cuhc","ucuh uchuhc","uycu uhuhd","fuh ihcih","cuhc uhcuh"
  ];
  
  
  export default function BracketPage() {
      console.log(teams.length)
    const { leftRounds, rightRounds, finalRound } = generateBracket(teams);
  
    return (
      <div className="h-screen w-full p-6">
        <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl font-bold text-center mb-6 bg-black w-fit skew-7">Knockout Tournament Bracket</h1>
        </div>
        <div className="w-full p-5  overflow-scroll">
        <Bracket leftRounds={leftRounds} rightRounds={rightRounds} finalRound={finalRound} />
        </div>
      </div>
    );
  }
  