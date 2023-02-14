

import java.util.*;

class Candidate {
    int id;
    List<String> preferredLocations;

    public Candidate(int id, List<String> preferredLocations) {
        this.id = id;
        this.preferredLocations = preferredLocations;
    }
}

class Location {
    String name;
    List<String> attributes;

    public Location(String name, List<String> attributes) {
        this.name = name;
        this.attributes = attributes;
    }
}

public class LocationMatching {
    public static Map<Candidate, Location> matchLocations(List<Candidate> candidates, List<Location> locations) {
        Map<Candidate, Location> matches = new HashMap<>();
        List<Location> remainingLocations = new ArrayList<>(locations);

        for (Candidate candidate : candidates) {
            int highestScore = 0;
            Location bestLocation = null;

            for (Location location : remainingLocations) {
                int score = 0;
                for (String preferredLocation : candidate.preferredLocations) {
                    if (location.attributes.contains(preferredLocation)) {
                        score++;
                    }
                }

                if (score > highestScore) {
                    highestScore = score;
                    bestLocation = location;
                }
            }

            if (bestLocation != null) {
                matches.put(candidate, bestLocation);
                remainingLocations.remove(bestLocation);
            }
        }

        return matches;
    }

    public static void main(String[] args) {
        List<Candidate> candidates = new ArrayList<>();
        candidates.add(new Candidate(1, List.of("niceclimate", "nightLife")));
        candidates.add(new Candidate(2, List.of("diversity", "historical")));
        candidates.add(new Candidate(3, List.of("lowCost", "EnglishArchitecture")));

        List<Location> locations = new ArrayList<>();
        locations.add(new Location("Delhi", List.of("diversity", "historical")));
        locations.add(new Location("Kolkata", List.of("lowCost", "EnglishArchitecture")));
        locations.add(new Location("Bangalore", List.of("niceclimate", "nightLife")));

        Map<Candidate, Location> matches = matchLocations(candidates, locations);
        for (Map.Entry<Candidate, Location> match : matches.entrySet()) {
            System.out.println("Candidate " + match.getKey().id + " is matched to " + match.getValue().name);
        }
    }
}
