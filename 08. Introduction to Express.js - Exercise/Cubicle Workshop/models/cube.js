module.exports = class Cube {
    constructor(id, name, description, imageUrl, difficultyLevel) {
        this.id = id,
        this.name = name,
        this.description = description,
        this.imageUrl = imageUrl,
        this.difficultyLevel = difficultyLevel
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            imageUrl: this.imageUrl,
            difficultyLevel: this.difficultyLevel
        };
    }
}