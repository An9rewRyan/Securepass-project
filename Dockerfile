FROM python:3.9

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /securepass/

COPY . .
RUN ls
RUN cd backend && ls && python -m pip install --upgrade pip && pip install pipenv && pipenv install --system --deploy