/**
 * CRICKET ANALYTICA ENGINE v1.0 (Serverless / Static)
 * Architecture: Event-driven State Controller with Absolute Zero-Error Normalization
 */

// 1. GLOBAL STATE MANAGER
const State = {
    player1: null,
    player2: null
};

// 2. MOCK API DATABASE SCHEMA (Matching CricketData.org structure)
const MOCK_CRICKET_DATABASE = {
    "virat kohli": {
        id: "v-18",
        name: "Virat Kohli",
        country: "India",
        role: "Top-order Batter",
        stats: {
            batting: {
                ODI: { matches: 295, runs: 13848, average: 58.67, strikeRate: 93.54, highestScore: 183 },
                T20I: { matches: 125, runs: 4188, average: 48.69, strikeRate: 137.04, highestScore: 122 }
            },
            bowling: {
                ODI: { matches: 295, wickets: 5, economy: 5.62, bestBowling: "1/15" },
                T20I: { matches: 125, wickets: 4, economy: 8.05, bestBowling: "1/13" }
            },
            fielding: {
                ODI: { catches: 151, stumpings: 0, runOuts: 18 },
                T20I: { catches: 54, stumpings: 0, runOuts: 7 }
            }
        }
    },
    "babar azam": {
        id: "b-56",
        name: "Babar Azam",
        country: "Pakistan",
        role: "Top-order Batter",
        stats: {
            batting: {
                ODI: { matches: 117, runs: 5729, average: 56.72, strikeRate: 88.75, highestScore: 158 },
                T20I: { matches: 119, runs: 4145, average: 41.03, strikeRate: 129.08, highestScore: 122 }
            },
            bowling: {
                ODI: { matches: 117, wickets: 0, economy: 5.40, bestBowling: "0/0" },
                T20I: { matches: 119, wickets: 0, economy: 8.75, bestBowling: "0/0" }
            },
            fielding: {
                ODI: { catches: 50, stumpings: 0, runOuts: 11 },
                T20I: { catches: 42, stumpings: 0, runOuts: 9 }
            }
        }
    }
};

/**
 * 3. ASYNCHRONOUS API DISPATCHER
 * Simulates a standard fetch network delay, handling missing data cleanly.
 */
async function fetchPlayerData(searchQuery) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const cleanQuery = searchQuery.trim().toLowerCase();
            if (MOCK_CRICKET_DATABASE[cleanQuery]) {
                // Return deep clone to ensure state immutability
                resolve(JSON.parse(JSON.stringify(MOCK_CRICKET_DATABASE[cleanQuery])));
            } else {
                reject(new Error(`Player "${searchQuery}" not found in tracking indexes.`));
            }
        }, 400); // 400ms network latency simulation
    });
}

// 4. CORE SEARCH INTERFACE INITIALIZER
function initSearchListeners() {
    const wireSearch = (slotNum, searchInputId, buttonId) => {
        const input = document.getElementById(searchInputId);
        const button = document.getElementById(buttonId);

        button.addEventListener('click', async () => {
            const query = input.value;
            if (!query) return;

            button.innerText = "Fetching...";
            button.disabled = true;

            try {
                const playerData = await fetchPlayerData(query);
                State[`player${slotNum}`] = playerData;
                console.log(`[STATE SYNCED] Player ${slotNum} loaded:`, State[`player${slotNum}`]);
                
                // Temporary verification handler: flag the placeholder text
                document.getElementById(`p${slotNum}-placeholder`).innerText = `Data loaded for: ${playerData.name}`;
            } catch (error) {
                console.error(`[ENGINE ERROR]:`, error.message);
                alert(error.message + " Try searching for 'Virat Kohli' or 'Babar Azam'.");
            } finally {
                button.innerText = "Search";
                button.disabled = false;
            }
        });
    };

    wireSearch(1, 'p1-search', 'p1-btn');
    wireSearch(2, 'p2-search', 'p2-btn');
}

// DOM Event Loop hook
document.addEventListener('DOMContentLoaded', () => {
    initSearchListeners();
});
/**
 * 4. DYNAMIC DOM RENDER MATRIX
 * Converts structural data profiles into UI presentation components.
 */
function renderPlayerCard(slotNum) {
    const player = State[`player${slotNum}`];
    const contentArea = document.getElementById(`p${slotNum}-content`);
    const placeholder = document.getElementById(`p${slotNum}-placeholder`);
    const containerCard = document.getElementById(`player${slotNum}-card`);

    if (!player) return;

    // Reveal UI container structures
    placeholder.classList.add('hidden');
    contentArea.classList.remove('hidden');
    containerCard.classList.remove('opacity-60');

    // Generate inner component structure with defensive fielding metrics front-and-center
    contentArea.innerHTML = `
        <div class="border-b border-slate-700 pb-4">
            <div class="flex justify-between items-start">
                <div>
                    <h2 class="text-2xl font-bold tracking-tight text-white">${player.name}</h2>
                    <p class="text-xs font-mono text-slate-400 mt-0.5">${player.role} • ${player.country}</p>
                </div>
                <span class="text-xs px-2 py-1 bg-slate-900 border border-slate-700 rounded-md font-mono text-slate-400">
                    ID: ${player.id}
                </span>
            </div>
        </div>

        <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                🏏 Batting Performance Matrix
            </h4>
            <div class="overflow-x-auto">
                <table class="w-full text-left text-sm text-slate-300">
                    <thead class="text-xs uppercase bg-slate-900/60 text-slate-400 border border-slate-700/50">
                        <tr>
                            <th class="px-3 py-2">Format</th>
                            <th class="px-3 py-2">Mat</th>
                            <th class="px-3 py-2">Runs</th>
                            <th class="px-3 py-2">Avg</th>
                            <th class="px-3 py-2">S/R</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-800 border-x border-b border-slate-800">
                        ${Object.keys(player.stats.batting).map(format => `
                            <tr class="hover:bg-slate-700/20 transition-colors">
                                <td class="px-3 py-2 font-mono font-bold text-slate-400">${format}</td>
                                <td class="px-3 py-2">${player.stats.batting[format].matches}</td>
                                <td class="px-3 py-2">${player.stats.batting[format].runs}</td>
                                <td class="px-3 py-2 text-emerald-400 font-medium">${player.stats.batting[format].average.toFixed(2)}</td>
                                <td class="px-3 py-2 text-cyan-400 font-medium">${player.stats.batting[format].strikeRate.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="space-y-3">
            <h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                🧤 Fielding Analytics Hub
            </h4>
            <div class="grid grid-cols-3 gap-3">
                <div class="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center">
                    <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Catches</p>
                    <p class="text-lg font-bold text-slate-200 mt-1">
                        ${player.stats.fielding.ODI.catches + player.stats.fielding.T20I.catches}
                    </p>
                    <p class="text-[10px] font-mono text-slate-500 mt-0.5">
                        O: ${player.stats.fielding.ODI.catches} | T: ${player.stats.fielding.T20I.catches}
                    </p>
                </div>
                <div class="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center">
                    <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Stumpings</p>
                    <p class="text-lg font-bold text-slate-200 mt-1">
                        ${player.stats.fielding.ODI.stumpings + player.stats.fielding.T20I.stumpings}
                    </p>
                    <p class="text-[10px] font-mono text-slate-500 mt-0.5">
                        O: ${player.stats.fielding.ODI.stumpings} | T: ${player.stats.fielding.T20I.stumpings}
                    </p>
                </div>
                <div class="bg-slate-900/60 border border-slate-800 p-3 rounded-xl text-center">
                    <p class="text-xs text-slate-500 font-medium uppercase tracking-wide">Run-Outs</p>
                    <p class="text-lg font-bold text-slate-200 mt-1">
                        ${player.stats.fielding.ODI.runOuts + player.stats.fielding.T20I.runOuts}
                    </p>
                    <p class="text-[10px] font-mono text-slate-500 mt-0.5">
                        O: ${player.stats.fielding.ODI.runOuts} | T: ${player.stats.fielding.T20I.runOuts}
                    </p>
                </div>
            </div>
        </div>
    `;
}

/**
 * 5. POST-LOAD TRIGGER INTERCEPTOR
 * Updates the structural pipeline hook to pass data directly into UI processors.
 */
function updateSearchListenerHook() {
    const wireSearch = (slotNum, searchInputId, buttonId) => {
        const input = document.getElementById(searchInputId);
        const button = document.getElementById(buttonId);

        button.addEventListener('click', async () => {
            const query = input.value;
            if (!query) return;
            button.innerText = "Fetching...";
            button.disabled = true;

            try {
                const playerData = await fetchPlayerData(query);
                State[`player${slotNum}`] = playerData;
                
                // EXECUTE DYNAMIC CARD RENDER
                renderPlayerCard(slotNum);
                
                // EXECUTE INSIGHT ANALYSIS HUB TRIGGER (Hooked up in Step 4)
                if (State.player1 && State.player2) {
                    runAnalyticalInsightEngine();
                }

            } catch (error) {
                alert(error.message);
            } finally {
                button.innerText = "Search";
                button.disabled = false;
            }
        });
    };

    // Wipe baseline listeners and hot-swap structural hooks
    document.getElementById('p1-btn').replaceWith(document.getElementById('p1-btn').cloneNode(true));
    document.getElementById('p2-btn').replaceWith(document.getElementById('p2-btn').cloneNode(true));
    wireSearch(1, 'p1-search', 'p1-btn');
    wireSearch(2, 'p2-search', 'p2-btn');
}

// Append a stub engine function so it doesn't break when tracking dependencies execute
function runAnalyticalInsightEngine() {
    console.log("[INSIGHT ROUTER]: Balanced data states parsed. Syncing algorithms...");
}

// Reinitialize bindings automatically 
setTimeout(updateSearchListenerHook, 0);