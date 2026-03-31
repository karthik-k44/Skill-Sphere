import type { DropDownOption } from "../types";
import { UserLanguageProficiency, UserSkillLevel, UserSkillRating, UserSkillType } from "../types/user-profile";


export const UserSkillsData: DropDownOption[] = [
  {
    label: 'Select a skill',
    value: '',
  },
  {
    label: 'React',
    value: UserSkillType.REACT,
  },
  {
    label: 'Node.js',
    value: UserSkillType.NODEJS,
  },
  {
    label: 'Frameworks',
    value: UserSkillType.FRAMEWORKS
  },
  {
    label: 'Python',
    value: UserSkillType.PYTHON,
  },
  {
    label: 'Java',
    value: UserSkillType.JAVA
  },
  {
    label: 'C#',
    value: UserSkillType.CSHARP
  },
  {
    label: 'Ruby',
    value: UserSkillType.RUBY
  },
  {
    label: 'Go',
    value: UserSkillType.GO
  },
  {
    label: 'PHP',
    value: UserSkillType.PHP
  },
  {
    label: 'Swift',
    value: UserSkillType.SWIFT
  },
  {
    label: 'Kotlin',
    value: UserSkillType.KOTLIN
  },
  {
    label: 'TypeScript',
    value: UserSkillType.TYPESCRIPT
  },
  {
    label: 'JavaScript',
    value: UserSkillType.JAVASCRIPT
  },
  {
    label: 'HTML',
    value: UserSkillType.HTML
  },
  {
    label: 'CSS',
    value: UserSkillType.CSS
  },
  {
    label: 'SQL',
    value: UserSkillType.SQL
  },
  {
    label: 'AWS',
    value: UserSkillType.AWS  
  },
  {
    label: 'Azure',
    value: UserSkillType.AZURE
  },
  {
    label: 'GCP',
    value: UserSkillType.GCP
  },
  {
    label: 'Jenkins',
    value: UserSkillType.JENKINS
  },
  {
    label: 'Docker',
    value: UserSkillType.DOCKER
  },
  {
    label: 'Kubernetes',
    value: UserSkillType.KUBERNETES
  },
  {
    label: 'Git',
    value: UserSkillType.GIT
  },
  {
    label: 'Linux',
    value: UserSkillType.LINUX
  },
  {
    label: 'Formik',
    value: UserSkillType.FORMIK
  },
  {   
    label: 'React Hook Form',
    value: UserSkillType.REACT_HOOK_FORM
  },
  {
    label: 'Redux Toolkit',
    value: UserSkillType.REDUX_TOOLKIT
  },
  {
    label: 'Spring Boot',
    value: UserSkillType.SPRING_BOOT
  },
  {
    label: 'Spring Data JPA',
    value: UserSkillType.SPRING_DATA_JPA
  },
  {
    label: 'Spring Security',
    value: UserSkillType.SPRING_SECURITY
  },
  {
    label: 'Spring Cloud',
    value: UserSkillType.SPRING_CLOUD
  },
  {
    label: 'Other',
    value: UserSkillType.OTHER
  }
]

export const UserSkillLevelData: DropDownOption[] = [
  {
    label: 'Beginner',
    value: UserSkillLevel.BEGINNER
  },
  {
    label: 'Intermediate',
    value: UserSkillLevel.INTERMEDIATE
  },
  {
    label: 'Advanced',
    value: UserSkillLevel.ADVANCED
  },
  {
    label: 'Expert',
    value: UserSkillLevel.EXPERT
  }
]

export const userSkillRatingData: DropDownOption[] = [
  {
    label: '1',
    value: UserSkillRating.ONE
  },
  {
    label: '2',
    value: UserSkillRating.TWO
  },
  {
    label: '3',
    value: UserSkillRating.THREE
  },
  {
    label: '4',
    value: UserSkillRating.FOUR
  },
  {
    label: '5',
    value: UserSkillRating.FIVE
  }
]

export const UserLanguageProficiencyData: DropDownOption[] = [
  {
    label: 'Select proficiency level',
    value: '',
  },
  {
    label: 'Basic',
    value: UserLanguageProficiency.BASIC,
  },
  {
    label: 'Conversational',
    value: UserLanguageProficiency.CONVERSATIONAL,
  },
  {
    label: 'Intermediate',
    value: UserLanguageProficiency.INTERMEDIATE,
  },
  {
    label: 'Advanced',
    value: UserLanguageProficiency.ADVANCED,
  },
  {
    label: 'Fluent',
    value: UserLanguageProficiency.FLUENT,
  },
  {
    label: 'Native',
    value: UserLanguageProficiency.NATIVE,
  },
];