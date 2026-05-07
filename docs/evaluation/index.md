# Evaluation

This page describes the methodology and assets used to evaluate the performance of the solution. The three main categories that are evaluated are climate, setpoints and energy.

## Terminology

We use precise terminology to distinguish between different aspects of AI evaluation.

### Performance terms

| Term            | Meaning                                                                                                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Efficiency**  | Performance specifically when the AI was in control. This provides a measure of how well the AI is doing when it is control and running.                        |
| **Savings**     | Performance over a given period regardless of control status. Includes downtime. This focuses on the result over a period, giving the actual savings estimates. |
| **Performance** | Umbrella term for how well the AI does. Covers both efficiency and savings.                                                                                     |

### Baseline terms

| Term                       | Meaning                                                                                                                                                                                                  |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Baseline**               | The predicted counterfactual — what a signal _would have been_ without AI intervention. Can come from multiple sources: baseline models (preferred), supply curves (fallback), or repetition heuristics. |
| **Baseline model**         | A model trained on reference data to predict baseline values based on outdoor temperature. Stored in `baselines.predictions` Iceberg table. Preferred baseline source when it passes assessment.         |
| **Reference data**         | All historical OFF-period observations (when AI was not controlling but the circuit was on). The raw input from which baseline training data is curated.                                                 |
| **Baseline training data** | A curated subset of recent reference data selected for model training. Stored in `baselines.training_data` Iceberg table.                                                                                |
