
import React, { useState, useCallback } from 'react';
import FormField from './components/FormField';
import TeamCard from './components/TeamCard';
import { InputType } from './types'; // Agora é types.js
import { shuffleArray } from './utils/shuffleArray';

const App = () => {
  const [allPlayersInput, setAllPlayersInput] = useState('');
  const [numTeamsInput, setNumTeamsInput] = useState('2');
  const [playersPerTeamInput, setPlayersPerTeamInput] = useState('3');
  const [leadersInput, setLeadersInput] = useState('');
  const [womenInput, setWomenInput] = useState('');
  const [liberosInput, setLiberosInput] = useState('');
  
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const parsePlayerList = (input) => {
    // Corrected line:
    return input.split('\n').map(name => name.trim()).filter(name => name.length > 0);
  };

  const handleDraftTeams = useCallback(() => {
    setIsLoading(true);
    setError(null);
    setTeams([]);

    const numTeams = parseInt(numTeamsInput);
    const playersPerTeam = parseInt(playersPerTeamInput);

    if (isNaN(numTeams) || numTeams <= 0) {
      setError("Número de times deve ser um valor positivo.");
      setIsLoading(false);
      return;
    }
    if (isNaN(playersPerTeam) || playersPerTeam <= 0) {
      setError("Jogadores por time deve ser um valor positivo.");
      setIsLoading(false);
      return;
    }

    let generalPlayers = parsePlayerList(allPlayersInput);
    const leaders = parsePlayerList(leadersInput);
    const women = parsePlayerList(womenInput);
    const liberos = parsePlayerList(liberosInput);

    if (leaders.length !== numTeams) {
      setError(`É necessário fornecer ${numTeams} líderes, um para cada time. Foram fornecidos ${leaders.length}.`);
      setIsLoading(false);
      return;
    }
    
    const uniqueLeaders = Array.from(new Set(leaders));
    const uniqueWomen = Array.from(new Set(women));
    const uniqueLiberos = Array.from(new Set(liberos));

    if (uniqueLeaders.length !== numTeams) {
        setError(`Os nomes dos líderes devem ser únicos. Encontrados ${uniqueLeaders.length} líderes únicos para ${numTeams} times.`);
        setIsLoading(false);
        return;
    }

    const generatedTeams = Array.from({ length: numTeams }, (_, i) => ({
      id: i,
      name: `Time ${i + 1}`,
      leader: '',
      players: [],
    }));

    const assignedPlayers = new Set();
    const shuffledLeaders = shuffleArray(uniqueLeaders);

    shuffledLeaders.forEach((leaderName, i) => {
      if (i < numTeams) {
        generatedTeams[i].leader = leaderName;
        generatedTeams[i].players.push(leaderName);
        assignedPlayers.add(leaderName);
      }
    });

    generalPlayers = generalPlayers.filter(p => !assignedPlayers.has(p));
    
    const distributeSpecialPlayers = (
      specialPlayerList,
      currentTeams,
      currentAssignedPlayers,
      allGeneralPlayers
    ) => {
      const playersToAssign = shuffleArray(specialPlayerList.filter(p => !currentAssignedPlayers.has(p)));
      let teamIdx = 0;
      
      for (const player of playersToAssign) {
        let assignedThisPlayer = false;
        for (let i = 0; i < numTeams; i++) {
          const currentTeamTargetIdx = (teamIdx + i) % numTeams;
          const targetTeam = currentTeams[currentTeamTargetIdx];
          if (targetTeam.players.length < playersPerTeam) {
            targetTeam.players.push(player);
            currentAssignedPlayers.add(player);
            allGeneralPlayers = allGeneralPlayers.filter(p => p !== player);
            assignedThisPlayer = true;
            teamIdx = (currentTeamTargetIdx + 1) % numTeams;
            break; 
          }
        }
        if (!assignedThisPlayer) {
          // Player not assigned if all teams full
        }
      }
      return allGeneralPlayers;
    };

    generalPlayers = distributeSpecialPlayers(uniqueWomen, generatedTeams, assignedPlayers, generalPlayers);
    generalPlayers = distributeSpecialPlayers(uniqueLiberos, generatedTeams, assignedPlayers, generalPlayers);

    const remainingGeneralPlayers = shuffleArray(generalPlayers.filter(p => !assignedPlayers.has(p)));
    let generalPlayerTeamIdx = 0;
    for (const player of remainingGeneralPlayers) {
      let assignedThisPlayer = false;
      for (let i = 0; i < numTeams; i++) {
        const currentTeamTargetIdx = (generalPlayerTeamIdx + i) % numTeams;
        const targetTeam = generatedTeams[currentTeamTargetIdx];
        if (targetTeam.players.length < playersPerTeam) {
          targetTeam.players.push(player);
          assignedThisPlayer = true;
          generalPlayerTeamIdx = (currentTeamTargetIdx + 1) % numTeams;
          break;
        }
      }
       if (!assignedThisPlayer) {
          // Player not assigned if all teams full
       }
    }
    
    let totalPlayersInTeams = 0;
    generatedTeams.forEach(team => {
        totalPlayersInTeams += team.players.length;
        team.players = Array.from(new Set(team.players)); // Ensure players unique per team
    });

    const totalExpectedPlayers = numTeams * playersPerTeam;
    // Consider all initially provided players for uniqueness count
    const allInitialPlayersList = [
        ...parsePlayerList(allPlayersInput), 
        ...uniqueLeaders, // Already unique
        ...uniqueWomen, // Already unique
        ...uniqueLiberos // Already unique
    ];
    const allAvailableUniquePlayers = new Set(allInitialPlayersList.filter(p => p));


    if (totalPlayersInTeams < totalExpectedPlayers && totalPlayersInTeams < allAvailableUniquePlayers.size) {
        setError(prevError => (prevError ? prevError + " " : "") + "Atenção: Não haviam jogadores suficientes para preencher todas as vagas conforme especificado. Times podem estar incompletos.");
    }


    setTeams(generatedTeams);
    setIsLoading(false);
  }, [numTeamsInput, playersPerTeamInput, allPlayersInput, leadersInput, womenInput, liberosInput]);

  return (
    <div className="min-h-screen bg-orange-500 text-purple-900 p-4 md:p-8 flex flex-col items-center">
      <header className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>
          <span className="text-purple-800">AREIA</span><span className="text-purple-900">31</span>
        </h1>
        <p className="text-xl text-purple-700 mt-2">Simulador de Times de Vôlei</p>
      </header>

      <div className="w-full max-w-6xl bg-purple-300/80 backdrop-blur-md p-6 md:p-10 rounded-xl shadow-2xl border border-purple-400/50">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-6 mb-8">
          <FormField
            id="allPlayers"
            label="1. Todos os Jogadores (um por linha)"
            value={allPlayersInput}
            onChange={setAllPlayersInput}
            type={InputType.TEXTAREA}
            placeholder="Ana Silva\nCarlos Souza\nBeatriz Lima..."
          />
          <FormField
            id="numTeams"
            label="2. Quantidade de Times"
            value={numTeamsInput}
            onChange={setNumTeamsInput}
            type={InputType.NUMBER}
            min={1}
          />
          <FormField
            id="playersPerTeam"
            label="3. Jogadores por Time"
            value={playersPerTeamInput}
            onChange={setPlayersPerTeamInput}
            type={InputType.NUMBER}
            min={1}
          />
          <FormField
            id="leaders"
            label="4. Líderes (um por linha, N° de líderes = N° de times)"
            value={leadersInput}
            onChange={setLeadersInput}
            type={InputType.TEXTAREA}
            placeholder="Líder Alfa\nLíder Beta..."
          />
          <FormField
            id="women"
            label="5. Mulheres (uma por linha)"
            value={womenInput}
            onChange={setWomenInput}
            type={InputType.TEXTAREA}
            placeholder="Maria Oliveira\nSofia Costa..."
          />
          <FormField
            id="liberos"
            label="6. Líberos (um por linha)"
            value={liberosInput}
            onChange={setLiberosInput}
            type={InputType.TEXTAREA}
            placeholder="João Santos\nPedro Almeida..."
          />
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-200 text-red-800 font-semibold rounded-lg shadow-sm border border-red-400">
            {error}
          </div>
        )}

        <button
          onClick={handleDraftTeams}
          disabled={isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-4 px-8 rounded-lg shadow-xl text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-400"
          style={{ fontFamily: "'Roboto Condensed', sans-serif" }}
        >
          {isLoading ? 'Sorteando Times...' : 'REALIZAR SORTEIO DOS TIMES'}
        </button>
      </div>

      {teams.length > 0 && (
        <section className="w-full max-w-6xl mt-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-purple-900" style={{ fontFamily: "'Roboto Condensed', sans-serif" }}>Times Sorteados</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {teams.map(team => (
              <TeamCard key={team.id} team={team} />
            ))}
          </div>
        </section>
      )}
      <footer className="mt-12 text-center text-purple-700/80 text-sm">
        <p>&copy; {new Date().getFullYear()} Areia31. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
};

export default App;
