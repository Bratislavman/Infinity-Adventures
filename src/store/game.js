import {Game1} from "@/game/games/game1/Game1";

export const GET_STORIES = 'GET_STORIES';
export const GET_GAME = 'GET_GAME';

export const INIT_GAME = 'INIT_GAME';
export const EXIT_GAME = 'EXIT_GAME';
export const GET_GAME_INDEX = 'GET_GAME_INDEX';
export const MUTATION_GAME_INIT = 'MUTATION_GAME_INIT';
export const MUTATION_GAME_EXIT = 'MUTATION_GAME_EXIT';
export const MUTATION_GAME_RESTART = 'MUTATION_GAME_RESTART';

export const game = {
    state: {
        stories: [
            {
                title: 'story1.title',
                description: 'story1.description',
                gameClass: Game1,
            },
            {
                title: 'story2.title',
            },
            {
                title: 'story3.title',
            },
            {
                title: 'story4.title',
            }
        ],

        game: null,
        gameIndex: -1,
    },
    mutations: {
        [MUTATION_GAME_INIT]: (state, index) => {
            state.game = new state.stories[index].gameClass;
            state.gameIndex = index;
        },
        [MUTATION_GAME_EXIT]: state => {
            state.game = null;
            state.gameIndex = 0;
        },
        [MUTATION_GAME_RESTART]: state => {
            state.game = new state.stories[state.gameIndex].gameClass;
        },
    },
    getters: {
        [GET_STORIES]: state => state.stories,
        [GET_GAME]: state => state.game,
    },
    actions: {

    },
}