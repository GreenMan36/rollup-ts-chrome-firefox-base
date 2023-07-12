import browser from "webextension-polyfill";

// define a stats type
type Stats = {
  "count-blocked": number;
  "count-redirected": number;
  "count-replaced": number;
};

function getStats(): Promise<Stats> {
  return browser.storage.sync.get("stats").then((data) => {
    const stats = data.stats;
    if (!stats) {
      console.log("No stats found, initializing");
      return {
        "count-blocked": 0,
        "count-redirected": 0,
        "count-replaced": 0,
      };
    }
    return stats;
  });
}

function setStats(stats: Stats): Promise<void> {
  return browser.storage.sync.set({ stats: stats });
}

function resetStats(): Promise<void> {
  return setStats({
    "count-blocked": 0,
    "count-redirected": 0,
    "count-replaced": 0,
  });
}

function incrementStat(stat: keyof Stats): Promise<void> {
  return getStats().then((stats) => {
    stats[stat] = stats[stat] + 1;
    return setStats(stats);
  });
}

export { getStats, setStats, incrementStat, resetStats, Stats };
