<script lang="ts">
  export let data;

  $: ({ session, supabase } = data);

  const LoginWithGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };
</script>

<h1>SvelteKit Auth Example</h1>
<p>
  {#if session}
    {#if session.user?.user_metadata.avatar_url}
      <span
        style="background-image: url('{session.user.user_metadata.avatar_url}')"
        class="avatar"
      />
    {/if}
    <span class="signedInText">
      <small>Signed in as</small><br />
      <strong>{session.user?.user_metadata.full_name ?? 'User'}</strong>
    </span>
    <button on:click={() => signOut()} class="button">Sign out</button>
  {:else}
    <span class="notSignedInText">You are not signed in</span>
    <button on:click={LoginWithGithub}>Sign In with GitHub</button>
  {/if}
</p>
