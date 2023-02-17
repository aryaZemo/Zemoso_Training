
/* 
 
Ques:-  John is a recruiter in a company and wants to map candidates based on their location preferences.
        Develop an algorithm to match candidates to the locations based on their preferences.
 */




import java.util.*;

class Candidate {
    private String name;
    private String preferredLocation;
    private int yearsOfExperience;

    public Candidate(String name, String preferredLocation, int yearsOfExperience) {
        this.name = name;
        this.preferredLocation = preferredLocation;
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getName() {
        return name;
    }

    public String getPreferredLocation() {
        return preferredLocation;
    }

    public int getYearsOfExperience() {
        return yearsOfExperience;
    }
}

class Location {
    private String name;
    private int availableSeats;

    public Location(String name, int availableSeats) {
        this.name = name;
        this.availableSeats = availableSeats;
    }

    public String getName() {
        return name;
    }

    public int getAvailableSeats() {
        return availableSeats;
    }

    public void setAvailableSeats(int availableSeats) {
        this.availableSeats = availableSeats;
    }
}

public class LocationMatching {
    public static void main(String[] args) {
        
        /*  -- Create a list with their prefrences and having year of experience */

        List<Candidate> candidates = new ArrayList<>();

        candidates.add(new Candidate("Sourav", "Kolkata", 5));
        candidates.add(new Candidate("Suraj", "Delhi", 3));
        candidates.add(new Candidate("Abhishek", "Hydrabad", 7));
        candidates.add(new Candidate("Raman", "Bangalore", 4));
        candidates.add(new Candidate("Rajesh", "Kolkata", 2));
        candidates.add(new Candidate("Gourav", "Kolkata", 6));

        /* create a list of locations with their available seats */

        List<Location> locations = new ArrayList<>();

        locations.add(new Location("Kolkata", 2));
        locations.add(new Location("Bangalore", 1));
        locations.add(new Location("Hydrabad", 1));

        /*  sort the candidates based on their years of experience (in descending order) */
        
        Collections.sort(candidates, (c1, c2) -> c2.getYearsOfExperience() - c1.getYearsOfExperience());

        // map each candidate to a location based on their preferences and the available seats

        Map<String, String> candidateLocationMapping = new HashMap<>();

        for (Candidate candidate : candidates) {
            for (Location location : locations) {
                if (candidate.getPreferredLocation().equals(location.getName()) && location.getAvailableSeats() > 0) {
                    candidateLocationMapping.put(candidate.getName(), location.getName());
                    location.setAvailableSeats(location.getAvailableSeats() - 1);
                   
                }
            }
        }

        // printing the candidate location mapping

        System.out.println("Candidate Location Mapping:");
        for (Map.Entry<String, String> entry : candidateLocationMapping.entrySet()) {
            System.out.println(entry.getKey() + " -> " + entry.getValue());
        }
    }
}
