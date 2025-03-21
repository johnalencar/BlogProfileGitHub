import  { useEffect, useState } from "react";
import axios from "axios";
import { SummaryAnchors, SummaryContainer, SummaryHeader } from "./styles";
import { ArrowUpRight, Buildings, GithubLogo, Users } from "phosphor-react";

// Definindo a interface para os dados do GitHub
interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  company: string | null;
  location: string | null;
  followers: number;
}

export function Summary() {
  const [user, setUser] = useState<GitHubUser | null>(null);

  const fetchGitHubUser = async () => {
    try {
      const response = await axios.get<GitHubUser>("https://api.github.com/users/johnalencar");
      setUser(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
    }
  };

  useEffect(() => {
    fetchGitHubUser();
  }, []);

 
 if (!user) {
    return <p>Carregando...</p>;
  }

  return (
    <SummaryContainer>
      <img src={user.avatar_url}  alt={`${user.login}avatar`} />
      <section>
        <SummaryHeader>
          <h1>{user.name}</h1>
          <a href={`https://github.com/${user.login}`} target="_blank" rel="noopener noreferrer">
            GITHUB
            <ArrowUpRight size={12} />
          </a>
        </SummaryHeader>
        <p>{user.bio}</p>
        <SummaryAnchors>
          <div>
            <GithubLogo size={18} />
            <span>{user.login}</span>
          </div>

          <div>
            <Buildings size={18} />
            <span>{user.company || "Xtreme Tecnologia"}</span>
          </div>

          <div>
            <Users size={18} />
            <span>{user.followers}</span>
          </div>
        </SummaryAnchors>
      </section>
    </SummaryContainer>
  );
}
