import UserSearch from "@/components/UserSearch";
import { Metadata } from "next";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "User Search",
  description: "Search user to follow",
};

// server
function SearchPage() {
  return <UserSearch />; // client
}

export default SearchPage;
