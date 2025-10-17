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
      <header className="relative z-20 border-b border-border bg-background text-lg">
        <div className="mx-auto w-full lg:flex lg:max-w-7xl lg:items-center lg:gap-8 lg:px-16 lg:py-6">
          <section className="flex items-center gap-3 px-4 py-8 lg:grow-1 lg:p-0">
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
            <section className="flex border-t border-border px-4 py-8 lg:border-none lg:p-0">
              <FollowForm creatorProfile={creatorProfile} />
            </section>
          ) : null}
          {creatorProfile.twitter_handle || cartItemsCount ? (
            <section className="border-t border-border px-4 py-8 lg:border-none lg:p-0">
              {creatorProfile.twitter_handle ? (
                <NavigationButton outline href={`https://twitter.com/${creatorProfile.twitter_handle}`} target="_blank">
                  <Icon name="twitter" />
                </NavigationButton>
              ) : null}
              <CartNavigationButton />
            </section>
          ) : null}
        </div>
      </header>
      <main className="grow-1">
        {children}
        <PoweredByFooter className="mx-auto w-full lg:max-w-7xl lg:px-16 lg:py-6 lg:text-left" />
      </main>
    </div>
  );
};
