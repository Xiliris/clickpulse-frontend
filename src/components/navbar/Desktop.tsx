import Item from "./Item";
import Container from "./Container";
import ExternalItem from "./ExternalItem";
import Spinner from "../Spinner";

function Desktop({ loadingUser, user }: any) {
  return (
    <>
      <ul className="flex justify-between items-center gap-5 lg:hidden">
        <Container title="Why us?">
          <Item href="/lightweight" icon="fa-feather">
            Lightweight Script
          </Item>
          <Item href="/privacy-commitment" icon="fa-user-shield">
            Privacy Commitment
          </Item>
          <Item href="/easy-to-use" icon="fa-thumbs-up">
            Easy to use
          </Item>
          <Item href="/constantly-improving" icon="fa-sync-alt">
            Constantly Improving
          </Item>
        </Container>
        <Container title="Connect">
          <ExternalItem
            href="https://x.com/ClickpulseTeam"
            icon="fa-brands fa-twitter"
          >
            Twitter
          </ExternalItem>
          <ExternalItem
            href="https://www.tiktok.com/@clickpulseteam"
            icon="fa-brands fa-tiktok"
          >
            TikTok
          </ExternalItem>
          <ExternalItem
            href="https://linkedin.com"
            icon="fa-brands fa-linkedin"
          >
            LinkedIn
          </ExternalItem>
          <ExternalItem
            href="https://discord.gg/9eWFeSW7pz"
            icon="fa-brands fa-discord scale-[0.95] -translate-x-px"
          >
            Discord
          </ExternalItem>
        </Container>
        <Container title="Pricing">
          <Item href="/pricing-more#monthly" icon="fa-calendar-alt">
            Monthly
          </Item>
          <Item href="/pricing-more#yearly" icon="fa-calendar-check">
            Yearly
          </Item>
        </Container>
      </ul>
      {loadingUser ? (
        <Spinner className="justify-end w-24 lg:hidden" />
      ) : (
        user && (
          <Container title={user.username} className="lg:hidden">
            <Item href="/dashboard" icon="fa-tachometer-alt">
              Dashboard
            </Item>
            <Item href="/change-password" icon="fa-key">
              Change Password
            </Item>
            <Item href="/logout" icon="fa-sign-out-alt">
              Logout
            </Item>
          </Container>
        )
      )}
    </>
  );
}

export default Desktop;
