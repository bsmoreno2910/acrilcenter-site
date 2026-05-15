const REALM = "Acrilcenter Admin";

export async function onRequest(context) {
  const url = new URL(context.request.url);

  if (!isAdminPath(url.pathname)) {
    return context.next();
  }

  const expectedUser = context.env.ADMIN_USER;
  const expectedPassword = context.env.ADMIN_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new Response("Admin credentials are not configured.", {
      status: 500,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  const credentials = getBasicCredentials(context.request);

  if (
    !credentials ||
    !constantTimeEqual(credentials.user, expectedUser) ||
    !constantTimeEqual(credentials.password, expectedPassword)
  ) {
    return unauthorized();
  }

  return context.next();
}

function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

function getBasicCredentials(request) {
  const header = request.headers.get("Authorization");
  const scheme = "Basic ";

  if (!header || !header.toLowerCase().startsWith(scheme.toLowerCase())) {
    return null;
  }

  try {
    const decoded = decodeBase64Utf8(header.slice(scheme.length));
    const separator = decoded.indexOf(":");

    if (separator === -1) {
      return null;
    }

    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

function decodeBase64Utf8(value) {
  const binary = atob(value);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}

function unauthorized() {
  return new Response("Authentication required.", {
    status: 401,
    headers: {
      "Cache-Control": "no-store",
      "WWW-Authenticate": `Basic realm="${REALM}", charset="UTF-8"`,
    },
  });
}

function constantTimeEqual(actual, expected) {
  const actualLength = actual.length;
  const expectedLength = expected.length;

  if (actualLength === 0 || expectedLength === 0) {
    return actualLength === expectedLength;
  }

  let diff = actualLength ^ expectedLength;
  const length = Math.max(actualLength, expectedLength);

  for (let index = 0; index < length; index += 1) {
    diff |=
      actual.charCodeAt(index % actualLength) ^
      expected.charCodeAt(index % expectedLength);
  }

  return diff === 0;
}
