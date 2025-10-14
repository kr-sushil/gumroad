import * as React from "react";

import { CreatorProfile } from "$app/parsers/profile";
import { classNames } from "$app/utils/classNames";

import { NavigationButton } from "$app/components/Button";
import { CartNavigationButton } from "$app/components/Checkout/CartNavigationButton";
import { useCartItemsCount } from "$app/components/Checkout/useCartItemsCount";
import { Icon } from "$app/components/Icons";
import { useLoggedInUser } from "$app/components/LoggedInUser";
import { PoweredByFooter } from "$app/components/PoweredByFooter";

import { FollowForm } from "./FollowForm";

type Props = {
  className?: string;
  creatorProfile: CreatorProfile;
  hideFollowForm?: boolean;
  children?: React.ReactNode;
};

export const Layout = ({ className, creatorProfile, hideFollowForm, children }: Props) => {
  const cartItemsCount = useCartItemsCount();
  const loggedInUser = useLoggedInUser();

  return (
    <div className={classNames("flex min-h-full flex-col", className)}>
      <header className="bg-background lg:border-border lg:px-profile-padding relative z-20 text-lg lg:flex lg:items-center lg:gap-8 lg:border-b lg:py-6">
        <section className="border-border flex items-center gap-3 border-b px-4 py-8 lg:grow-1 lg:border-none lg:p-0">
          {(loggedInUser?.isGumroadAdmin || loggedInUser?.isImpersonating) &&
          creatorProfile.external_id !== loggedInUser.id ? (
            <NavigationButton
              style={{ position: "absolute", left: "var(--spacer-3)" }}
              color="filled"
              href={Routes.admin_impersonate_url({ user_identifier: creatorProfile.external_id })}
            >
              Impersonate
            </NavigationButton>
          ) : null}
          <img className="user-avatar" src={creatorProfile.avatar_url} alt="Profile Picture" />
          <a href={Routes.root_path()} style={{ textDecoration: "none" }}>
            {creatorProfile.name}
          </a>
        </section>
        {!hideFollowForm ? (
          <section className="border-border flex border-b px-4 py-8 lg:border-none lg:p-0">
            <FollowForm creatorProfile={creatorProfile} />
          </section>
        ) : null}
        {creatorProfile.twitter_handle || cartItemsCount ? (
          <section className="border-border border-b px-4 py-8 lg:border-none lg:p-0">
            {creatorProfile.twitter_handle ? (
              <NavigationButton outline href={`https://twitter.com/${creatorProfile.twitter_handle}`} target="_blank">
                <Icon name="twitter" />
              </NavigationButton>
            ) : null}
            <CartNavigationButton />
          </section>
        ) : null}
      </header>
      <main
        className={classNames(
          "custom-sections lg:*:px-profile-padding grow-1",
          loggedInUser?.id === creatorProfile.external_id && "has-user",
        )}
      >
        {children}
        <PoweredByFooter className="lg:py-6 lg:text-left" />
      </main>
    </div>
  );
};
