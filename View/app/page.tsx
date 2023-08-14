import DiscriptionCard from "@/components/home/DiscriptionCard";
import GameCards from "@/components/home/GameCards";
import MatchHistory from "@/components/home/MatchHistory";

export default function Home() {
  return (
    <main className="overflow-hidden ">
      <DiscriptionCard />
      <GameCards />
      <MatchHistory />
    </main>
  );
}
