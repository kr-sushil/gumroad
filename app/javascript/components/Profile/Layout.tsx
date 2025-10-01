import cx from "classnames";
import * as React from "react";

import { CreatorProfile } from "$app/parsers/profile";

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
    <div
      className={cx(
        "override grid min-h-full grid-rows-[auto_1fr] lg:[&.reader>main>.comments]:pr-[max(100%-50rem-max((100%-71.25rem)/2,4rem),4rem)] [&.reader>main>article]:text-lg lg:[&.reader>main>article]:pr-[max(100%-50rem-max((100%-71.25rem)/2,4rem),4rem)]",
        className,
      )}
    >
      <header className="override relative z-20 grid grid-cols-[1fr] bg-background text-lg lg:grid-flow-col lg:items-center lg:gap-8 lg:border-b lg:border-border lg:px-[max((100%-71.25rem)/2,4rem)] lg:py-6">
        <section className="flex items-center gap-3 border-b border-border px-4 py-8 lg:col-[unset] lg:row-[unset] lg:border-none lg:p-0">
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
          <section className="col-span-2 col-end-auto flex items-center gap-3 border-b border-border px-4 py-8 lg:col-[unset] lg:row-[unset] lg:border-none lg:p-0">
            <FollowForm creatorProfile={creatorProfile} />
          </section>
        ) : null}
        {creatorProfile.twitter_handle || cartItemsCount ? (
          <section className="col-span-2 col-start-2 col-end-auto row-start-1 flex items-center gap-3 border-b border-border px-4 py-8 lg:col-[unset] lg:row-[unset] lg:border-none lg:p-0">
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
        className={cx(
          "custom-sections row-[unset] lg:*:px-[max((100%-71.25rem)/2,4rem)] lg:[&>footer]:py-6 lg:[&>footer]:text-left",
          loggedInUser?.id === creatorProfile.external_id && "has-user",
        )}
      >
        {children}
        <PoweredByFooter />
      </main>
    </div>
  );
};
