from langchain_openai import OpenAIEmbeddings
from langchain.evaluation import load_evaluator
from dotenv import load_dotenv
import openai 
import os

load_dotenv()
open_api_key = os.environ['OPEN_API_KEY']

def main():
    # get embedding for a word
    embedding_function = OpenAIEmbeddings()
    vector = embedding_function.embed_query("apple")
    print(f"vector for 'apple': {vector}")
    print(f"vector length: {len(vector)}")

    # compare vector of two words 
    evaluator = load_evaluator("parirwise_embedding_distance") # evaluates the vectors of two strings against each other
    words = ("apple", "iphone")
    x =  evaluator.evaluate_string_pairs(prediction=words[0], prediction_b=words[1])
    print(f"Compairing ({words[0]}, {words[1]}): {x}")

if __name__ == "__main__":
    main()