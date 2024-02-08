# 베이스 이미지를 선택합니다. 이 예시에서는 Ubuntu 20.04를 사용합니다.
FROM ubuntu:20.04

# 환경 변수를 설정합니다.
ENV RUNNER_VERSION=2.283.2 \
    RUNNER_LABELS="self-hosted,docker" \
    REPO_URL="https://github.com/your-username/your-repository" \
    RUNNER_NAME="your-runner-name" \
    ACCESS_TOKEN="your-github-access-token"

# 필요한 패키지를 설치합니다.
RUN apt-get update && apt-get install -y \
    curl \
    git \
    && rm -rf /var/lib/apt/lists/*

# GitHub Actions Runner를 다운로드하고 설치합니다.
RUN mkdir actions-runner \
    && cd actions-runner \
    && curl -O -L https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz \
    && tar xzf ./actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz \
    && ./bin/installdependencies.sh \
    && rm -f ./actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz

# 실행할 스크립트를 추가합니다.
COPY entrypoint.sh /entrypoint.sh

# 스크립트를 실행 가능하도록 변경합니다.
RUN chmod +x /entrypoint.sh

# 컨테이너가 시작될 때 실행할 명령을 지정합니다.
ENTRYPOINT ["/entrypoint.sh"]
